"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Code, Activity, Youtube, Mail, Wrench } from "iconoir-react";

// PERFORMANCE FIX: Static array ko component se bahar rakha hai taake har render par dubara na banay
const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Projects", href: "#projects", icon: Code },
  { name: "Skills", href: "#skills", icon: Wrench },
  { name: "Activity", href: "#activity", icon: Activity },
  { name: "Media", href: "#media", icon: Youtube },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Stop background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isMobileOpen]);

  // ================= SCROLL SPY LOGIC (OPTIMIZED) =================
  useEffect(() => {
    const observerOptions = {
      root: null,
      // Sirf exact middle (50%) screen par aane wale section ko active karega, jisse lag nahi hoga
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentItem = navItems.find(
            (item) => item.href === `#${entry.target.id}`,
          );
          if (currentItem && currentItem.name !== activeTab) {
            setActiveTab(currentItem.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navItems.forEach((item) => {
      const sectionId = item.href.substring(1);
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activeTab]); // added activeTab to dependency to prevent stale state loops

  // ================= SMOOTH SCROLL CLICK HANDLER =================
  const handleNavClick = (e, href, name) => {
    e.preventDefault();
    setActiveTab(name);
    setIsMobileOpen(false);

    const sectionId = href.substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-1 bg-background/60 backdrop-blur-xl border border-border/40 px-3 py-2 rounded-full shadow-2xl relative"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.name)}
                className="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-colors group text-muted-foreground hover:text-foreground"
              >
                {/* PERFORMANCE FIX: Removed AnimatePresence here, layoutId is enough for Framer Motion */}
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative z-10 transition-colors ${isActive ? "text-primary" : "group-hover:text-primary"}`}
                >
                  <Icon strokeWidth={2} width={18} height={18} />
                </motion.div>
                <span
                  className={`relative z-10 hidden lg:inline-block transition-colors ${isActive ? "text-foreground font-semibold" : ""}`}
                >
                  {item.name}
                </span>
              </a>
            );
          })}
        </motion.nav>
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden fixed top-5 left-5 z-[60]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 w-12 h-12 bg-background/80 backdrop-blur-xl border border-border/40 rounded-full shadow-lg text-foreground focus:outline-none flex flex-col items-center justify-center gap-[5px]"
        >
          <motion.div
            animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-5 h-[2px] bg-foreground rounded-full"
          />
          <motion.div
            animate={
              isMobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }
            }
            className="w-4 h-[2px] bg-foreground rounded-full self-start ml-3.5"
          />
          <motion.div
            animate={
              isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
            }
            className="w-5 h-[2px] bg-foreground rounded-full"
          />
        </button>
      </div>

      {/* MOBILE NAVBAR OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6 w-full px-8">
              {navItems.map((item, i) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;

                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={(e) => handleNavClick(e, item.href, item.name)}
                    className={`flex items-center justify-center gap-4 w-full py-4 text-2xl font-medium rounded-2xl transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon strokeWidth={2} width={28} height={28} />
                    <span>{item.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
