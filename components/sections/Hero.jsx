"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Database,
  Server,
  Laptop,
  Youtube,
} from "iconoir-react";
import Image from "next/image";
import heroImage from "../../public/assets/image.png";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  const headingText = "Designing Reliable ";
  const highlightedText = "Scalable Systems.";

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-12 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start space-y-4 w-full lg:w-1/2 order-2 lg:order-1"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Full Stack Developer & Entrepreneur
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]"
            >
              {headingText}
              <br />
              <span className="text-primary opacity-100">
                {highlightedText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.2, delay: 0.5 + index * 0.08 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mt-0"
            >
              Hi, I'm Abdullah. With over 2 years of experience and 30+ solo
              projects under my belt, my true passion lies in full stack
              development and system design. From running my own agency to
              teaching code on YouTube, I love simplifying complex problems into
              clean, scalable solutions.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-2"
            >
              {[
                { name: "System Design", icon: Server },
                { name: "Full Stack Developer", icon: Database },
                { name: "UI/UX Designer", icon: Laptop },
                { name: "Content Creator", icon: Youtube },
              ].map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium border border-border/50 transition-colors hover:border-primary/40"
                  >
                    <Icon
                      strokeWidth={2}
                      width={16}
                      height={16}
                      className="text-primary"
                    />
                    {skill.name}
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-6 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="group relative flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-primary text-primary-foreground rounded-full font-semibold overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work{" "}
                  <ArrowRight
                    width={18}
                    height={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </a>

              <a
                href="https://github.com/mabdullahchaudhary"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-transparent border-2 border-primary/20 text-foreground rounded-full font-semibold hover:border-primary/50 transition-all active:scale-95"
              >
                <Github
                  width={18}
                  height={18}
                  className="group-hover:text-primary transition-colors"
                />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="relative w-full max-w-md aspect-square order-1 lg:order-2 flex justify-center lg:justify-end lg:translate-x-6"
          >
            <div className="relative w-full h-full max-w-[380px] max-h-[380px] rounded-[2rem] bg-background border border-border/60 shadow-xl p-2 group">
              <div className="absolute inset-0 border-2 border-primary/0 rounded-[2rem] transition-colors duration-500 group-hover:border-primary/20" />

              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-secondary">
                <Image
                  src={heroImage}
                  alt="Abdullah - Full Stack Developer"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-4 -left-2 sm:-left-8 bg-background/90 backdrop-blur-md border border-border/50 p-4 rounded-2xl shadow-lg max-w-[240px]"
            >
              <p className="text-sm text-foreground font-medium italic leading-snug">
                "Simplicity is prerequisite for reliability."
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-semibold">
                — Edsger W. Dijkstra
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
