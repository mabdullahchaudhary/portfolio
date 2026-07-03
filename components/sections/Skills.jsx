"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop,
  Database,
  Server,
  UserStar,
  Download,
  CodeBrackets,
  CheckCircle,
  NavArrowDown,
  Eye,
} from "iconoir-react";

export default function Skills() {
  const [showResumeOptions, setShowResumeOptions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowResumeOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const skillCategories = [
    {
      id: 1,
      title: "Frontend Engineering",
      icon: Laptop,
      description:
        "Building pixel-perfect, highly interactive, and accessible user interfaces with modern web technologies.",
      skills: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "Redux",
        "Shadcn UI",
      ],
    },
    {
      id: 2,
      title: "Backend & MERN Stack",
      icon: Database,
      description:
        "Architecting robust server-side applications, RESTful APIs, and managing complex database structures.",
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "PostgreSQL",
        "Supabase",
        "REST APIs",
      ],
    },
    {
      id: 3,
      title: "Architecture & DSA",
      icon: Server,
      description:
        "Focusing on system scalability, low-latency edge functions, and optimized data structures.",
      skills: [
        "System Design",
        "C++",
        "JavaScript",
        "Serverless",
        "Caching (Redis)",
        "Microservices",
      ],
    },
    {
      id: 4,
      title: "Leadership & Soft Skills",
      icon: UserStar,
      description:
        "Driving projects from concept to completion with strong communication and team management capabilities.",
      skills: [
        "Team Leadership",
        "Agency Management",
        "Content Creation",
        "Problem Solving",
        "Mentoring",
        "Agile/Scrum",
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative w-full pb-20 md:pb-24 pt-8 md:pt-12 bg-background overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-foreground text-xs font-semibold tracking-wide mb-4 border border-border/80 shadow-sm">
              <CodeBrackets width={14} height={14} className="text-primary" />
              Capabilities & Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Technical{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff8c00]">
                Arsenal.
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base max-w-2xl font-medium leading-relaxed">
              A comprehensive overview of my technical proficiency,
              problem-solving skills, and the leadership qualities I bring to
              every engineering challenge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative shrink-0"
            ref={dropdownRef}
          >
            <button
              onClick={() => setShowResumeOptions(!showResumeOptions)}
              className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-sm font-bold rounded-full shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300 active:scale-95"
            >
              Resume
              <NavArrowDown
                width={18}
                height={18}
                className={`transition-transform duration-300 ${showResumeOptions ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {showResumeOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-1 w-56 rounded-2xl border border-border/60 bg-background p-2 shadow-xl z-50 flex flex-col gap-1"
                >
                  <a
                    href="https://drive.google.com/file/d/1wl_rnm8la_qU49G_UVDZZ2NcweDFxff0/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-secondary/80 hover:text-primary transition-colors"
                  >
                    <Eye width={18} /> View Online
                  </a>
                  <a
                    href="/assets/Full%20Stack%20Developer%20-%20Abdullah.pdf"
                    download="Full Stack Developer - Abdullah.pdf"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-foreground hover:bg-secondary/80 hover:text-primary transition-colors"
                  >
                    <Download width={18} /> Download Resume
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group relative flex flex-col p-8 bg-background border border-border/80 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mb-4 md:mb-5">
                  <div className="p-3.5 bg-secondary/80 rounded-2xl group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon width={28} height={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <p className="relative z-10 text-sm text-muted-foreground leading-relaxed mb-8 font-medium">
                  {category.description}
                </p>

                <div className="relative z-10 flex flex-wrap gap-2.5 mt-auto">
                  {category.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-foreground text-xs font-semibold border border-border/60 rounded-xl group-hover:border-primary/20 transition-colors"
                    >
                      <CheckCircle
                        width={12}
                        height={12}
                        className="text-primary/70"
                      />
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
