"use client";

import { motion } from "framer-motion";

export function HeroText() {
  return (
    <div className="mb-12 ml-0  overflow-hidden">
      {/* Line 1 */}
      <motion.h1
        initial={{ opacity: 0, filter: "blur(12px)", }}
        animate={{ opacity: 1, filter: "blur(0px)", }}
        transition={{ duration: 1, ease: "easeOut" }}
<<<<<<< Updated upstream
        className="text-[clamp(36px,9vw,72px)] font-normal leading-[1.1] text-white whitespace-normal md:whitespace-nowrap text-center md:text-left"
=======
        className="text-[clamp(36px,9vw,72px)] font-normal leading-[1.1] text-[#41050c] whitespace-normal md:whitespace-nowrap text-center md:text-left"
>>>>>>> Stashed changes
      >
        Mixspace
      </motion.h1>

      {/* Line 2 */}
      <motion.h1
        initial={{ opacity: 0, filter: "blur(12px)", }}
        animate={{ opacity: 1, filter: "blur(0px)", }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="
          text-[clamp(36px,9vw,72px)]
          font-normal
          leading-[1.1]
<<<<<<< Updated upstream
          text-white
=======
          text-[#41050c]
>>>>>>> Stashed changes
          whitespace-normal
          md:whitespace-nowrap
          text-center
          md:text-left
          ml-0 md:ml-32 lg:ml-60
          mt-2 md:mt-0
        "
      >
        Studio
      </motion.h1>
    </div>
  );
}

export default HeroText;