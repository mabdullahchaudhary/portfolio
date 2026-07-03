export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return Response.json(
      { error: "Missing YouTube API Key or Channel ID" },
      { status: 400 },
    );
  }

  try {
    // YouTube channel ID 'UC...' ko 'UU...' mein badal kar Uploads playlist mil jati hai
    const uploadsPlaylistId = channelId.replace(/^UC/, "UU");

    // Latest 6 videos fetch kar rahe hain (aap maxResults change kar sakte hain)
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
      { cache: "no-store" },
    );

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.error?.message || "YouTube API error");

    const videos = data.items.map((item) => ({
      id: item.id,
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      publishedAt: new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(item.snippet.publishedAt)),
    }));

    return Response.json({ videos });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
