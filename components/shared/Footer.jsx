"use client";

import {
  Github,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  Mail,
  Globe,
  MessageText,
  NavArrowUp,
} from "iconoir-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      name: "Website",
      icon: Globe,
      url: "http://abdullahchaudhary.me/",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://pk.linkedin.com/in/abdullahchaudharyfullstackengineer",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/mabdullahchaudhary",
    },
    {
      name: "WhatsApp",
      icon: MessageText,
      url: "https://wa.me/923217085212",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:profession.abdullah@gmail.com",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@EazyPizyCoders",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/profile.php?id=61553654722732",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/abdu11ah.akram",
    },
  ];

  return (
    <footer className="w-full border-t border-border/40 bg-background py-8 md:py-10 z-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* ================= LEFT: BRAND & COPYRIGHT ================= */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center md:text-left">
          <button
            onClick={scrollToTop}
            className="text-xl font-bold text-foreground tracking-tight hover:opacity-80 transition-opacity"
          >
            Abdullah<span className="text-primary">.</span>
          </button>

          <span className="hidden sm:inline text-border/80">|</span>

          <p className="text-sm font-medium text-muted-foreground">
            © {currentYear} All rights reserved.
          </p>
        </div>

        {/* ================= CENTER: MINIMAL SOCIALS ================= */}
        <div className="flex items-center gap-5">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 duration-300"
              >
                <Icon width={20} height={20} strokeWidth={2} />
              </a>
            );
          })}
        </div>

        {/* ================= RIGHT: BACK TO TOP ================= */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          Back to Top
          <div className="p-1.5 rounded-lg bg-secondary/50 border border-border/50 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
            <NavArrowUp
              width={16}
              height={16}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </div>
        </button>
      </div>
    </footer>
  );
}
