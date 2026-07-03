"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Youtube, Play, ArrowRight, VideoCamera } from "iconoir-react";

export default function Media() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/youtube");

        // Agar API nahi bani hui to forcefully catch block mein bhej do
        if (!res.ok) throw new Error("API Route not found");

        const data = await res.json();
        setVideos(data.videos);
      } catch (err) {
        console.warn(
          "YouTube API not found. Loading realistic demo data to prevent crash.",
        );
        // Graceful Fallback: Demo Data
        setVideos([
          {
            id: 1,
            videoId: "jNQXAC9IVRw",
            title: "Understanding React Server Components & Next.js 15",
            publishedAt: "2 days ago",
          },
          {
            id: 2,
            videoId: "dQw4w9WgXcQ",
            title: "System Design: Scalable Architecture Explained",
            publishedAt: "1 week ago",
          },
          {
            id: 3,
            videoId: "M7lc1UVf-VE",
            title: "MERN Stack Crash Course for Beginners 2026",
            publishedAt: "1 month ago",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
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
      id="media"
      className="relative w-full py-12 md:py-16 bg-secondary/30 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-start mb-10"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background text-foreground text-xs font-semibold tracking-wide mb-3 border border-border/80 shadow-sm">
            <VideoCamera width={14} height={14} className="text-primary" />
            Content Creation
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground flex items-center gap-3">
            Watch &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff8c00]">
              Learn.
            </span>
          </h2>
          <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-2xl font-medium">
            Sharing my knowledge through technical deep-dives, coding tutorials,
            and architectural teardowns on YouTube.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {loading
            ? [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-background border border-border/80 rounded-3xl overflow-hidden h-[280px]"
                >
                  <div className="w-full aspect-video bg-secondary/50 animate-pulse border-b border-border/50" />
                  <div className="p-5 flex flex-col gap-3">
                    <div className="w-1/3 h-4 bg-secondary/50 rounded animate-pulse" />
                    <div className="w-full h-5 bg-secondary/50 rounded animate-pulse" />
                    <div className="w-2/3 h-5 bg-secondary/50 rounded animate-pulse" />
                  </div>
                </div>
              ))
            : videos.map((video) => (
                <motion.div
                  key={video.id}
                  variants={itemVariants}
                  className="group relative flex flex-col bg-background border border-border/80 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative w-full aspect-video bg-muted border-b border-border/50">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.videoId}?modestbranding=1&rel=0`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    ></iframe>
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-md">
                          Tutorial
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                          <Play width={12} height={12} /> {video.publishedAt}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <a
            href={`https://www.youtube.com/channel/${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || ""}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/15 hover:scale-[1.02] active:scale-95"
          >
            <Youtube className="text-[#FF0000]" width={18} height={18} />
            View Full Channel
            <ArrowRight
              width={16}
              className="text-muted-foreground transition-all"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
