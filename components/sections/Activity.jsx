"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  GitCommit,
  Repository,
  Star,
  GitFork,
  Activity as ActivityIcon,
  ArrowUpRight,
} from "iconoir-react";

function getContributionClass(contributionCount) {
  if (!contributionCount) return "bg-secondary/85 border border-border/60";
  if (contributionCount < 3)
    return "bg-orange-200/95 border border-orange-300/50";
  if (contributionCount < 6) return "bg-orange-300 border border-orange-400/50";
  if (contributionCount < 10)
    return "bg-orange-400 border border-orange-500/50";
  return "bg-orange-500 border border-orange-600/60";
}

function getWeekMonthLabel(week) {
  const lastDay = week.contributionDays[week.contributionDays.length - 1];
  return new Date(lastDay.date).toLocaleString("en", { month: "short" });
}

export default function Activity() {
  const [repos, setRepos] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    public_repos: 0,
    public_gists: 0,
    total_stars: 0,
    total_forks: 0,
  });
  const [profile, setProfile] = useState(null);
  const [contributionCalendar, setContributionCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);
  const username =
    process.env.NEXT_PUBLIC_GITHUB_USERNAME || "mabdullahchaudhary";

  useEffect(() => {
    setMounted(true);
    const controller = new AbortController();

    const fetchGitHubData = async () => {
      try {
        const response = await fetch(
          `/api/github/activity?username=${encodeURIComponent(username)}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("API missing");

        const data = await response.json();
        setProfile(data.profile);
        setStats(data.stats);
        setRepos(data.repos || []);
        setRecentEvents(data.recentEvents || []);
        setContributionCalendar(data.contributionCalendar || null);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching GitHub data:", error);
          setError("Failed to load GitHub activity.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
    return () => controller.abort();
  }, [username]);

  useEffect(() => {
    if (scrollRef.current && contributionCalendar) {
      setTimeout(() => {
        if (scrollRef.current)
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
      }, 500);
    }
  }, [contributionCalendar]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section
      id="activity"
      className="relative w-full pt-8 md:pt-12 pb-20 md:pb-24 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start mb-10 md:mb-12"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-foreground text-xs font-semibold tracking-wide mb-4 border border-border/80">
            <ActivityIcon width={14} height={14} className="text-primary" />
            Open Source & Activity
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Code{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff8c00]">
              Contributions.
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-2xl">
            A transparent view of my engineering activity, open-source projects,
            and daily code commits directly from GitHub.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
          {[
            { label: "Followers", value: stats.followers },
            { label: "Following", value: stats.following },
            { label: "Repos", value: stats.public_repos },
            { label: "Stars", value: stats.total_stars },
            { label: "Forks", value: stats.total_forks },
            { label: "Gists", value: stats.public_gists },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border/80 bg-background p-4 shadow-sm hover:border-primary/30 transition-colors"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="p-5 md:p-8 bg-background border border-border/80 rounded-[2rem] shadow-md hover:shadow-lg transition-shadow duration-500 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <GitCommit className="text-primary" width={22} height={22} />
                  Annual Commit Graph
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-foreground">
                  <span className="flex items-center gap-1 rounded-full border border-border/80 bg-secondary/80 px-3 py-1.5">
                    <Repository width={16} /> {stats.public_repos} Repos
                  </span>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border/60 bg-secondary/30 p-5">
                {mounted && contributionCalendar ? (
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5 text-xs font-medium text-muted-foreground">
                      <span>
                        {contributionCalendar.totalContributions} contributions
                        in the last year
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1">Less</span>
                        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-secondary/80 border border-border/60" />
                        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-orange-200/90 border border-orange-300/50" />
                        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-orange-300 border border-orange-400/50" />
                        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-orange-400 border border-orange-500/50" />
                        <span className="inline-block h-2.5 w-2.5 rounded-sm bg-orange-500 border border-orange-600/60" />
                        <span>More</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="grid grid-rows-7 gap-[5px] text-[10px] font-semibold text-muted-foreground pt-[24px] pr-1.5 text-right h-[128px]">
                        <span></span>
                        <span className="flex items-center justify-end h-3.5">
                          Mon
                        </span>
                        <span></span>
                        <span className="flex items-center justify-end h-3.5">
                          Wed
                        </span>
                        <span></span>
                        <span className="flex items-center justify-end h-3.5">
                          Fri
                        </span>
                        <span></span>
                      </div>

                      <div
                        ref={scrollRef}
                        className="flex-1 overflow-x-auto pb-2 custom-scrollbar"
                      >
                        <div className="flex text-[10px] font-bold text-muted-foreground mb-2 h-4 relative">
                          {contributionCalendar.weeks.map((week, i) => {
                            const currentMonth = getWeekMonthLabel(week);
                            const prevMonth =
                              i > 0
                                ? getWeekMonthLabel(
                                    contributionCalendar.weeks[i - 1],
                                  )
                                : null;
                            if (currentMonth !== prevMonth) {
                              return (
                                <div
                                  key={i}
                                  className="absolute text-foreground font-bold"
                                  style={{ left: `${i * 19}px`, width: "40px" }}
                                >
                                  {currentMonth}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                        <div className="flex gap-[5px] pt-1">
                          {contributionCalendar.weeks.map((week) => (
                            <div
                              key={week.firstDay}
                              className="grid grid-rows-7 gap-[5px]"
                            >
                              {week.contributionDays.map((day) => (
                                <div
                                  key={day.date}
                                  title={`${day.date}: ${day.contributionCount} contributions`}
                                  className={`h-3.5 w-3.5 rounded-[3px] transition-transform duration-200 hover:scale-125 ${getContributionClass(day.contributionCount)}`}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-[200px] bg-secondary border border-border/50 rounded-[1.5rem] animate-pulse" />
                )}
              </div>
            </div>

            {recentEvents.length > 0 && (
              <div className="p-6 md:p-8 rounded-[2rem] border border-border/80 bg-background shadow-md mt-6">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <ActivityIcon
                    className="text-primary"
                    width={22}
                    height={22}
                  />{" "}
                  Latest Activity
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                  {recentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col rounded-xl border border-border/80 bg-secondary/60 px-4 py-3 text-sm hover:border-primary/30 transition-colors"
                    >
                      <p className="font-semibold text-foreground truncate">
                        {event.repo}
                      </p>
                      <p className="text-muted-foreground font-medium mt-1 text-xs">
                        {event.type.replace("Event", "")} · {event.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4"
          >
            <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2 px-2">
              <Repository className="text-primary" width={22} height={22} />{" "}
              Recent Repositories
            </h3>
            {loading
              ? [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-[120px] bg-secondary border border-border/80 rounded-[1.5rem] animate-pulse ${i === 4 ? "block md:hidden" : ""}`}
                  />
                ))
              : repos.slice(0, 5).map((repo, index) => (
                  <motion.a
                    key={repo.id}
                    variants={itemVariants}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className={`group p-5 bg-background border border-border/80 rounded-[1.5rem] shadow-sm hover:border-primary/50 hover:shadow-md hover:bg-secondary/20 transition-all duration-300 ${index === 4 ? "block md:hidden" : ""}`}
                  >
                    <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between gap-3">
                      <span className="truncate">{repo.name}</span>
                      <ArrowUpRight
                        width={18}
                        className="shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all"
                      />
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium mt-2 line-clamp-2 leading-relaxed">
                      {repo.description || "No description provided."}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-bold text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-foreground">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star width={14} /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork width={14} /> {repo.forks}
                      </span>
                    </div>
                  </motion.a>
                ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
