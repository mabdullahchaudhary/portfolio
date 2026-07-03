// Ye Next.js ko force karega ke wo is API ko kabhi cache na kare (Hamesha Live Data)
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(request) {
  const url = new URL(request.url);
  const username =
    url.searchParams.get("username") ||
    process.env.GITHUB_USERNAME ||
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
    "mabdullahchaudhary";

  const token =
    process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    // Sab requests par 'cache: "no-store"' lagaya hai
    const [profileResponse, reposResponse, eventsResponse, graphResponse] =
      await Promise.all([
        fetch(`https://api.github.com/users/${username}`, {
          headers,
          cache: "no-store",
        }),
        fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=6`,
          { headers, cache: "no-store" },
        ),
        fetch(
          `https://api.github.com/users/${username}/events/public?per_page=10`,
          { headers, cache: "no-store" },
        ),
        token
          ? fetch("https://api.github.com/graphql", {
              method: "POST",
              headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              cache: "no-store",
              body: JSON.stringify({
                query: `
                query ($username: String!) {
                  user(login: $username) {
                    contributionsCollection {
                      contributionCalendar {
                        totalContributions
                        weeks {
                          firstDay
                          contributionDays {
                            date
                            contributionCount
                            contributionLevel
                          }
                        }
                      }
                    }
                  }
                }
              `,
                variables: { username },
              }),
            })
          : Promise.resolve(null),
      ]);

    const profile = profileResponse.ok ? await profileResponse.json() : {};
    const rawRepos = reposResponse.ok ? await reposResponse.json() : [];
    const rawEvents = eventsResponse.ok ? await eventsResponse.json() : [];

    const repos = Array.isArray(rawRepos) ? rawRepos : [];
    const events = Array.isArray(rawEvents) ? rawEvents : [];

    const graphPayload =
      graphResponse && graphResponse.ok ? await graphResponse.json() : null;
    const contributionCalendar =
      graphPayload?.data?.user?.contributionsCollection?.contributionCalendar ||
      null;

    const summary = repos.reduce(
      (acc, repo) => {
        acc.total_stars += repo.stargazers_count || 0;
        acc.total_forks += repo.forks_count || 0;
        return acc;
      },
      {
        followers: profile.followers || 0,
        following: profile.following || 0,
        public_repos: profile.public_repos || 0,
        public_gists: profile.public_gists || 0,
        total_stars: 0,
        total_forks: 0,
      },
    );

    const normalizedRepos = repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      updatedAt: repo.pushed_at
        ? new Intl.DateTimeFormat("en", {
            month: "short",
            day: "numeric",
          }).format(new Date(repo.pushed_at))
        : "Recent",
    }));

    const recentEvents = events
      .filter(
        (event) => event.type === "PushEvent" || event.type === "CreateEvent",
      )
      .slice(0, 4)
      .map((event) => ({
        id: event.id,
        type: event.type,
        repo: event.repo?.name || "Repository",
        time: event.created_at
          ? new Intl.DateTimeFormat("en", {
              month: "short",
              day: "numeric",
            }).format(new Date(event.created_at))
          : "Recent",
      }));

    return Response.json(
      {
        profile: {
          name: profile.name || username,
          avatar_url: profile.avatar_url,
          html_url: profile.html_url,
          bio: profile.bio,
          blog: profile.blog,
          location: profile.location,
        },
        stats: summary,
        repos: normalizedRepos,
        recentEvents,
        contributionCalendar,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to fetch GitHub activity." },
      { status: 500 },
    );
  }
}
