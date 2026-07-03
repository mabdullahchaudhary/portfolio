"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Database,
  Code,
  Globe,
  Lock,
  NavArrowDown,
  NavArrowUp,
  Eye,
  Download,
} from "iconoir-react";

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [showPdfOptions, setShowPdfOptions] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPdfOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Alsalam United",
      description:
        "Corporate website built with a modern frontend stack for a polished business presence. Focused on performance, clean visuals, and smooth navigation. Live deployment available for public review.",
      tech: ["React", "Next.js", "Tailwind", "Framer Motion"],
      icon: Globe,
      links: {
        github: "https://github.com/mabdullahchaudhary/alsalam-united",
        live: "https://alsalamunited.com/",
      },
    },
    {
      id: 2,
      title: "Point International",
      description:
        "Business website designed for a premium company showcase with responsive layouts and clear calls to action. Built to feel fast, stable, and production ready. The live site is active.",
      tech: ["Next.js", "React", "Tailwind", "Lenis"],
      icon: Globe,
      links: {
        github: "https://github.com/mabdullahchaudhary/point-international",
        live: "https://pointinternationalkwt.com/",
      },
    },
    {
      id: 3,
      title: "Voice Vista AI v2",
      description:
        "AI-focused product experience built for a modern web workflow and a clean user journey. The interface is tuned for strong visual hierarchy and mobile responsiveness. Live site is publicly available.",
      tech: ["React", "Next.js", "Tailwind", "Framer Motion"],
      icon: Code,
      links: {
        github: "https://github.com/mabdullahchaudhary/voice-vista-ai-v2",
        live: "https://voicevistaai.tech/",
      },
    },
    {
      id: 4,
      title: "AI Receptionist",
      description:
        "Conversion-focused product site for a modern AI service with a clean landing-page structure. Designed to keep messaging simple, direct, and trustworthy. Live link is active.",
      tech: ["Next.js", "React", "Tailwind", "Framer Motion"],
      icon: Lock,
      links: {
        github: "https://github.com/mabdullahchaudhary/ai-receptionist",
        live: "https://www.airecruitment.works/",
      },
    },
    {
      id: 5,
      title: "Rupense Tracker",
      description:
        "Mobile application project focused on structured tracking and practical user flows. Built with a product-first mindset and a clean interface. Live version is coming soon.",
      tech: ["Mobile App", "UI/UX", "React Native", "Tracking"],
      icon: Database,
      links: {
        github: "https://github.com/mabdullahchaudhary/rupense-tracker",
        live: "#",
      },
    },
    {
      id: 6,
      title: "Developer Talks",
      description:
        "Another mobile application concept with a strong content and communication angle. Built to support clear interactions and future expansion. Public release is coming soon.",
      tech: ["Mobile App", "Content", "React Native", "UI"],
      icon: Code,
      links: {
        github: "https://github.com/mabdullahchaudhary/app-project",
        live: "#",
      },
    },
    {
      id: 7,
      title: "ANS Real Estate",
      description:
        "Property-focused web experience with polished presentation and clean browsing flow. Built for a professional real estate brand and modern frontend delivery. Live deployment is available.",
      tech: ["Next.js", "React", "Tailwind", "Framer Motion"],
      icon: Globe,
      links: {
        github: "https://github.com/mabdullahchaudhary/ans-real-estate",
        live: "https://ans-real-estate-055.vercel.app/",
      },
    },
    {
      id: 8,
      title: "Bookstack University Project",
      description:
        "Django-based project built with backend structure and application logic at the core. This one is explicitly backend-driven and shows a different stack focus. No live deployment shared.",
      tech: ["Django", "Python", "Backend", "Database"],
      icon: Database,
      links: {
        github:
          "https://github.com/mabdullahchaudhary/bookstack-university-project",
        live: "#",
      },
    },
    {
      id: 9,
      title: "Atif Portfolio",
      description:
        "Portfolio website with a sleek layout, smooth visuals, and responsive presentation. Built to showcase personal brand identity in a premium way. Live site is active.",
      tech: ["React", "Next.js", "Tailwind", "Framer Motion"],
      icon: Globe,
      links: {
        github: "https://github.com/mabdullahchaudhary/atif-portfolio",
        live: "https://atifanjum.vercel.app/",
      },
    },
    {
      id: 10,
      title: "Maida Portfolio",
      description:
        "Minimal portfolio build with a refined user interface and clean visual rhythm. Designed to keep the personal brand front and center. Live deployment is available.",
      tech: ["Next.js", "React", "Tailwind", "Motion"],
      icon: Globe,
      links: {
        github: "https://github.com/mabdullahchaudhary/maida-portfolio",
        live: "https://maidaawan.vercel.app/",
      },
    },
    {
      id: 11,
      title: "MSW Foundation",
      description:
        "Foundation website built for a private client with a focus on clarity, accessibility, and trust. The codebase is not publicly shared due to privacy. Live website is active.",
      tech: ["Private", "Website", "Accessibility", "Performance"],
      icon: Lock,
      links: { github: "#", live: "https://mswfoundation.com/" },
    },
    {
      id: 12,
      title: "Genzlancer",
      description:
        "Private commercial website delivered with a clean, modern frontend and a premium presentation style. The source is not public because of confidentiality. Live website is active.",
      tech: ["Private", "React", "Next.js", "Frontend"],
      icon: Lock,
      links: { github: "#", live: "https://genzlancer.com/" },
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < projects.length;

  function handleToggleProjects() {
    if (hasMoreProjects) {
      // Show 3 more
      setVisibleCount((currentCount) =>
        Math.min(currentCount + 3, projects.length),
      );
    } else {
      // See less (Reset to 3 and scroll back to top of section)
      setVisibleCount(3);
      const section = document.getElementById("projects");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <section
      id="projects"
      className="relative w-full py-20 bg-background/50 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-foreground text-xs font-semibold tracking-wide mb-4 border border-border/50">
              <Database width={14} height={14} className="text-primary" />
              Selected Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base max-w-2xl">
              A curated selection of web apps, portfolio builds, mobile
              concepts, and backend systems. Other private work stays off the
              page by design.
            </p>
          </motion.div>

          {/* ================= PORTFOLIO DROPDOWN BUTTON ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setShowPdfOptions(!showPdfOptions)}
              className="group flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-bold text-sm rounded-full shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Portfolio PDF
              <NavArrowDown
                width={18}
                height={18}
                className={`transition-transform duration-300 ${showPdfOptions ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {showPdfOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 w-56 rounded-2xl border border-border/60 bg-background p-2 shadow-xl z-50 flex flex-col gap-1"
                >
                  <a
                    href="https://drive.google.com/file/d/16XNwha_1cBAHvYMSK1Bc6aS4BYRsKYHR/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-secondary/80 hover:text-primary transition-colors"
                  >
                    <Eye width={18} /> View Online
                  </a>
                  <a
                    href="/assets/Projects%20Portfolio.pdf"
                    download="Projects Portfolio.pdf"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-secondary/80 hover:text-primary transition-colors"
                  >
                    <Download width={18} /> Download PDF
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ================= PROJECTS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visibleProjects.map((project) => {
            const Icon = project.icon;

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                layout
                className="group relative flex flex-col justify-between p-5 md:p-8 bg-background border border-border/60 rounded-[1.5rem] md:rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 ease-out min-h-[260px]"
              >
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div className="p-3 bg-secondary rounded-2xl group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
                      <Icon
                        strokeWidth={2}
                        width={24}
                        height={24}
                        className="text-foreground group-hover:text-primary transition-colors duration-300"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.links.github}
                        target={
                          project.links.github === "#" ? undefined : "_blank"
                        }
                        rel={
                          project.links.github === "#"
                            ? undefined
                            : "noreferrer"
                        }
                        aria-label="GitHub Repository"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github strokeWidth={2} width={20} height={20} />
                      </a>
                      <a
                        href={project.links.live}
                        target={
                          project.links.live === "#" ? undefined : "_blank"
                        }
                        rel={
                          project.links.live === "#" ? undefined : "noreferrer"
                        }
                        aria-label="Live Project"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ArrowUpRight
                          strokeWidth={2}
                          width={22}
                          height={22}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                    <a
                      href={project.links.live}
                      target={project.links.live === "#" ? undefined : "_blank"}
                      rel={
                        project.links.live === "#" ? undefined : "noreferrer"
                      }
                      className="cursor-pointer"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-lg border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= SEE MORE / SEE LESS BUTTON ================= */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={handleToggleProjects}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/15 hover:scale-[1.02] active:scale-95"
          >
            {hasMoreProjects ? (
              <>
                See more projects
                <ArrowUpRight
                  width={16}
                  height={16}
                  className="rotate-45 transition-transform"
                />
              </>
            ) : (
              <>
                See less projects
                <NavArrowUp
                  width={16}
                  height={16}
                  className="transition-transform"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
