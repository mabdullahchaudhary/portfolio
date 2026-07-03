"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  CheckCircle,
  XmarkCircle,
  MessageText,
  ArrowUpRight,
  Youtube,
  MapPin,
} from "iconoir-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Web3Forms Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      const formElement = e.target;
      const formData = new FormData(formElement);

      formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
      formData.append("subject", "New Portfolio Contact Submission");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        formElement.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updated Social Links for 2x2 Grid
  const contactLinks = [
    {
      name: "Email",
      value: "profession.abdullah@gmail.com",
      href: "mailto:profession.abdullah@gmail.com",
      icon: Mail,
    },
    {
      name: "LinkedIn",
      value: "Let's connect",
      href: "https://pk.linkedin.com/in/abdullahchaudharyfullstackengineer",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      value: "View Code",
      href: "https://github.com/mabdullahchaudhary",
      icon: Github,
    },
    {
      name: "YouTube",
      value: "Watch Tutorials",
      href: "https://www.youtube.com/@EazyPizyCoders",
      icon: Youtube,
    },
  ];

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
      id="contact"
      className="relative w-full py-20 bg-background overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-foreground text-xs font-semibold tracking-wide mb-4 border border-border/50">
            <MessageText width={14} height={14} className="text-primary" />
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Let's build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff8c00]">
              something great.
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-2xl">
            Whether you have a specific project in mind, need technical
            consultation, or just want to connect, feel free to drop a message
            or reach out via socials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* ================= LEFT COLUMN: 2x2 BENTO GRID ================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-5 grid grid-cols-2 gap-3 md:gap-4"
          >
            {/* 4 Social/Contact Boxes */}
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noreferrer" : undefined}
                  onClick={(e) => {
                    if (link.name === "Email") {
                      e.preventDefault();
                      navigator.clipboard.writeText(link.value);
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2000);
                    }
                  }}
                  className="group relative flex flex-col justify-between p-4 sm:p-5 bg-background border border-border/60 rounded-[1.25rem] sm:rounded-[1.5rem] shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 ease-out overflow-hidden h-[130px] sm:h-[150px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="p-2.5 sm:p-3 bg-secondary rounded-xl group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
                      <Icon
                        strokeWidth={2}
                        width={22}
                        height={22}
                        className="text-foreground group-hover:text-primary transition-colors duration-300"
                      />
                    </div>
                    <ArrowUpRight
                      strokeWidth={2}
                      width={18}
                      height={18}
                      className="text-muted-foreground opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {link.name}
                      </p>
                      {link.name === "Email" && copiedEmail && (
                        <span className="text-[10px] text-green-500 font-bold animate-pulse">
                          Copied!
                        </span>
                      )}
                    </div>
                    <p
                      className={`font-bold text-foreground group-hover:text-primary transition-colors duration-300 ${
                        link.name === "Email"
                          ? "text-[11px] sm:text-[13px] break-all leading-tight"
                          : "text-xs sm:text-sm truncate"
                      }`}
                    >
                      {link.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}

            {/* 5th Box: Location & Availability (Full Width) */}
            <motion.div
              variants={itemVariants}
              className="col-span-2 group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-background border border-border/60 rounded-[1.5rem] shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-500 ease-out overflow-hidden"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-secondary/80 rounded-2xl group-hover:bg-primary/10 transition-colors duration-300 shrink-0">
                  <MapPin
                    strokeWidth={2}
                    width={22}
                    height={22}
                    className="text-primary"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                    Location
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Lahore, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-foreground">
                  Available for remote work
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN: WEB3FORMS ================= */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            className="lg:col-span-7 w-full h-full"
          >
            <div className="group relative flex flex-col justify-between p-6 md:p-8 bg-background border border-border/60 rounded-[1.5rem] md:rounded-[2rem] shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 ease-out h-full overflow-hidden">
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div
                className={`absolute inset-0 z-20 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-500 ${isSubmitted ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
              >
                <CheckCircle
                  width={56}
                  height={56}
                  className="text-green-500 mb-4"
                />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground font-medium text-center px-6 max-w-sm">
                  Thank you for reaching out. I'll review your details and get
                  back to you shortly.
                </p>
              </div>

              <div
                className={`absolute inset-0 z-20 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-500 ${error ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
              >
                <XmarkCircle
                  width={56}
                  height={56}
                  className="text-red-500 mb-4"
                />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Something went wrong
                </h3>
                <p className="text-muted-foreground font-medium text-center px-6 max-w-sm">
                  Failed to send message. Please try connecting via direct
                  email.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  Skip the inbox clutter. Reach me directly through this secure
                  form.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-5 py-3.5 bg-secondary/50 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all font-medium hover:border-border/80"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-foreground ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      className="w-full px-5 py-3.5 bg-secondary/50 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all font-medium hover:border-border/80"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground ml-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject_title"
                    required
                    placeholder="e.g. Project Consultation"
                    className="w-full px-5 py-3.5 bg-secondary/50 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all font-medium hover:border-border/80"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground ml-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your goals and technical constraints..."
                    className="w-full px-5 py-3.5 bg-secondary/50 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all font-medium resize-none custom-scrollbar hover:border-border/80"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-6 py-4 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/15 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send
                        width={18}
                        height={18}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
