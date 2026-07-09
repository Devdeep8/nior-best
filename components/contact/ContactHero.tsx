"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectEnquiryForm, MinimalForm } from "./ContactForm";

const FULL_TEXT = "Get in touch with our team to discuss your business goals and digital marketing needs. Fill out the form below, and we'll connect with you shortly.";

// Identify specific groupings of words to track coloring styles easily
const highlights = {
  white: ["talking", "about", "a", "new", "project", "complete", "the", "form", "send", "us", "an", "email."],
  gray: ["If", "you", "are", "interested", "in", "—", "please", "or"]
};

export function ContactHero() {
  const [activeTab, setActiveTab] = useState("project-enquiry");

  const words = FULL_TEXT.split(" ");

  // Container for staggered children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  // Individual word variants
  const wordVariants = (word: string) => {
    // Determine end color based on highlights map
    let finalColor = "#ffffff"; // Default
    const cleanWord = word.replace(/[—.,]/g, '').trim();

    if (highlights.gray.some(g => g === cleanWord || g === word)) {
      finalColor = "#555555";
    } else if (highlights.white.some(w => w === cleanWord || w === word)) {
      finalColor = "#ffffff";
    }

    return {
      hidden: { color: "#2a2a2a" },
      visible: {
        color: finalColor,
        transition: { duration: 0.5, ease: "easeOut" as const },
      },
    };
  };

  const tabs = [
    { id: "project-enquiry", label: "Project enquiry" },
    { id: "careers", label: "Careers & Internships" },
    { id: "speak-to-team", label: "Speak to our team" },
  ];

  return (
    <section className="w-full min-h-screen bg-black pt-[120px] flex flex-col lg:flex-row px-4 lg:px-0 max-w-8xl mx-auto">
      {/* LEFT COLUMN (48%) */}
      <div className="lg:w-[48%] flex flex-col pt-[60px] pb-[60px] px-6 lg:pl-10 lg:pr-[5%]">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[clamp(28px,4vw,54px)] font-normal leading-[1.15] tracking-tight flex flex-wrap"
          style={{ rowGap: '0.1em', columnGap: '0.25em' }}
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants(word)}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tabs Navigation */}
        <div className="mt-12 flex flex-col gap-3.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative group w-fit text-left text-lg font-normal cursor-pointer pb-1.5 transition-colors duration-300 text-white hover:text-brand`}
              >
                {tab.label}
                {/* Animated Underline */}
                <span
                  className={`absolute bottom-0 right-0 w-full h-[1.5px] transition-transform duration-300 ease-out transform ${isActive
                    ? "bg-white scale-x-100 origin-left"
                    : "bg-brand scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-right"
                    }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN (52%) */}
      <div className="lg:w-[52%] w-full px-0 sm:px-6 lg:pl-4 lg:pr-20 py-12 relative">
        <div className="lg:sticky lg:top-[100px] bg-[#111111] border border-white/6 rounded-2xl py-8 px-5 sm:py-12 sm:px-10 min-h-[500px] flex flex-col">
          <motion.div
            key={activeTab} // Re-animate content change
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "project-enquiry" ? (
              <ProjectEnquiryForm />
            ) : (
              <MinimalForm />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
