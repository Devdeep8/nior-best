"use client";

export function Footer() {
  return (
    <footer className="bg-[var(--background)] text-[#41050c] pt-32 pb-8 px-6 lg:px-12 flex flex-col border-t border-[#41050c]/10">
      {/* Top row: Subscribe to us */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-4">
        <div className="flex items-center w-full flex-grow">
          <h2 className="text-[clamp(28px,5vw,64px)] font-normal leading-tight whitespace-normal sm:whitespace-nowrap tracking-tight text-center md:text-left w-full md:w-auto">
            Subscribe to us
          </h2>
          <div className="hidden md:block w-full h-[1px] bg-[#41050c]/10 ml-12"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
          <input
            type="email"
            placeholder="Email address"
            className="bg-[#41050c] border border-transparent focus:border-[#41050c]/20 rounded-full px-6 py-4 text-[#cecccc] text-lg placeholder:text-[#cecccc]/60 outline-none w-full md:w-[340px] transition-all"
          />
          <button className="bg-[#41050c] border border-[#41050c] text-[#cecccc] w-full sm:w-auto font-medium px-10 py-4 rounded-full hover:bg-white hover:border-white hover:text-[#41050c] transition-all text-lg cursor-pointer">
            Submit
          </button>
        </div>
      </div>

      {/* Giant Brand Text */}
      <div className="w-full mb-6 select-none overflow-hidden flex items-center justify-center md:justify-start">
        <h1 className="text-[clamp(35px,11vw,200px)] font-bold tracking-tighter uppercase leading-[0.8] w-full text-center md:text-left whitespace-nowrap -ml-1 md:-ml-2 lg:-ml-4">
          Mixspace Studio
        </h1>
      </div>

      {/* Bottom Strip */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-2 text-[12px] tracking-wider text-[#666] uppercase font-medium font-sans">

        {/* Left: Copyright */}
        <div className="mb-4 md:mb-0 normal-case text-[13px]">
          © 2019 — 2026
        </div>



        {/* Right: Social Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] tracking-[0.15em]">
          <a href="mailto:connect.mixspacestudio@gmail.com" className="flex items-center gap-2 hover:text-brand transition-colors group">
            <div className="w-1.5 h-1.5 rounded-full border border-[#555] group-hover:border-brand transition-colors"></div>
            MAIL
          </a>
          <a href="https://www.instagram.com/mixspacestudio?igsh=cXV3ZG12anBlbHlk" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand transition-colors group">
            <div className="w-1.5 h-1.5 rounded-full border border-[#555] group-hover:border-brand transition-colors"></div>
            INSTAGRAM
          </a>
          <a href="https://www.facebook.com/share/1BTfUsiFZt/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand transition-colors group">
            <div className="w-1.5 h-1.5 rounded-full border border-[#555] group-hover:border-brand transition-colors"></div>
            FACEBOOK
          </a>
          <a href="https://www.linkedin.com/company/mixspacestudio/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand transition-colors group">
            <div className="w-1.5 h-1.5 rounded-full border border-[#555] group-hover:border-brand transition-colors"></div>
            LINKEDIN
          </a>
          <a href="https://wa.me/message/HHILA74EGXT4K1" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand transition-colors group">
            <div className="w-1.5 h-1.5 rounded-full border border-[#555] group-hover:border-brand transition-colors"></div>
            WHATSAPP
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
