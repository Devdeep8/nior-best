"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  React.useEffect(() => {
    // Update body classes for page themes
    document.body.classList.remove("page-home", "page-studio", "page-blogs", "page-contact");
    if (pathname === "/") {
      document.body.classList.add("page-home");
    } else if (pathname === "/studio") {
      document.body.classList.add("page-studio");
    } else if (pathname === "/blogs" || pathname?.startsWith("/blogs/")) {
      document.body.classList.add("page-blogs");
    } else if (pathname === "/contact") {
      document.body.classList.add("page-contact");
    }

    // Wait slightly for Next.js to render the new route's DOM
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((el) => {
            if (el.isIntersecting) {
              el.target.classList.add("is-visible");
              observer.unobserve(el.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll(".reveal").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
