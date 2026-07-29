"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How can Mixspace Studio - A digital marketing agency help my startup/ business grow?",
    answer: "At Mixspace Studio, we help startups and businesses grow by building a powerful online presence and generating high-quality leads through proven digital marketing strategies. Our expert team offers end-to-end services including website development, search engine optimization (SEO), social media marketing, Google Ads, influencer campaigns, and more. Whether you're launching a new brand or scaling an existing one or you yourself are the brand, we craft personalized growth strategies that drive traffic, boost engagement, and increase sales. With data-driven insights and creative execution, Mixspace Studio empowers your business to stand out in a competitive digital landscape and achieve measurable results.",
  },
  {
    question: "Where does Mixspace Studio - A digital marketing agency provide services?",
    answer: "We provide services globally. While our teams are based in key locations, our digital marketing, branding, and web development services cater to ambitious clients worldwide, across various industries and regions.",
  },
  {
    question: "Can Mixspace Studio - A digital marketing agency be my CMO?",
    answer: "Yes, Mixspace Studio can act as your outsourced or a fractional Chief Marketing Officer (CMO). As a growth-focused digital marketing agency, we offer strategic leadership and execution across all digital channels—just like an in-house CMO would. From developing data-driven marketing plans and managing campaigns to analyzing performance and optimizing for ROI, we handle your brand's entire digital marketing function. This gives startups and small businesses access to CMO-level expertise without the high cost of hiring full-time executives. Whether you need long-term marketing guidance or support for specific growth stages, Mixspace Studio can serve as your dedicated CMO partner to drive real business results and the best part is this CMO comes along with his team also, so no more need of hiring or staff retention headaches. Hire us when ever you need us.",
  },
  {
    question: "What industries do you serve?",
    answer: "We serve a wide range of industries including but not limited to tech startups, e-commerce, real estate, healthcare, education, finance, and professional B2B/B2C services.",
  },
  {
    question: "How long does it take to complete a project?",
    answer: "The timeline varies depending on the complexity of the project. A standard website redesign or development might take 4-8 weeks, while a comprehensive digital marketing campaign is an ongoing process with initial results visible within the first month and compounding over time.",
  },
  {
    question: "Can you help redesign an existing website or brand marketing?",
    answer: "Yes, Mixspace Studio can redesign existing websites and revamping brand marketing to improve performance, user experience, and brand consistency. Whether your current website feels outdated, loads slowly, or isn't converting visitors into customers, our team will transform it into a modern, mobile-responsive, and SEO-optimized platform. We also refresh brand identities—logos, messaging, color palettes, and digital assets—to align with your business goals and appeal to your target audience. By combining creative design with strategic marketing, we help you relaunch stronger, attract more customers, and stay competitive in the digital space. We can act as a devils advocate but with solutions. So we show you the negatives about your business presence or clear marketing messes for brands with the solutions that can work best for you.",
  },
  {
    question: "Do you offer branding and logo design?",
    answer: "Yes, absolutely. Branding and logo design are fundamental parts of what we do. We help establish a strong, cohesive visual identity—from logos and color palettes to typography and brand guidelines—that resonates with your target audience and sets you apart from the competition.",
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="bg-[var(--background)] py-24 sm:py-32 border-t border-[#41050c]/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-[#41050c] text-[clamp(40px,6vw,64px)] font-normal leading-[1.1] tracking-tight mb-16 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="border-b border-[#41050c]/10 pb-6 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex justify-between items-center py-4 focus:outline-none group"
                >
                  <h3 className="text-[#404040] text-xl sm:text-2xl font-medium tracking-tight pr-8 group-hover:text-[#41050c] transition-colors">
                    {faq.question}
                  </h3>
                  <div className={`relative flex items-center justify-center w-6 h-6 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <div className="absolute w-full h-[2px] bg-[#404040] group-hover:bg-[#41050c] transition-colors rounded-full"></div>
                    <div className={`absolute w-[2px] h-full bg-[#404040] group-hover:bg-[#41050c] transition-colors rounded-full transition-transform duration-300 ${isOpen ? 'rotate-90 opacity-0' : ''}`}></div>
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[#41050c]/70 text-lg sm:text-xl leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
