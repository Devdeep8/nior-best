/**
 * Recent Work Section — content data
 */

export interface WorkProject {
  id: string;
  name: string;
  tag: string;
  image: string;
  /** "wide" = 2-col span, "tall" = taller card */
  size: "wide" | "normal" | "tall";
  year: string;
  videoSrc?: string;
  videoStartTime?: number;
}

export interface RecentWorkContent {
  label: { index: string; title: string };
  headline: {
    /** Each segment: text + whether it's highlighted (white+bold) */
    segments: { text: string; highlight: boolean }[];
  };
  projects: WorkProject[];
}

export const recentWorkContent: RecentWorkContent = {
  label: {
    index: "[03]",
    title: "RECENT WORK",
  },

  headline: {
    segments: [
      { text: "We craft impactful digital experiences through ", highlight: false },
      { text: "strategic marketing", highlight: true },
      { text: ", ", highlight: false },
      { text: "visual storytelling", highlight: true },
      { text: " and ", highlight: false },
      { text: "performance- driven design", highlight: true },
      { text: " by blending creativity, technology & brand innovation.", highlight: false },
    ],
  },

  projects: [
    {
      id: "numbers-ai",
      name: "Luzid",
      tag: "D2C",
      image: "/images/recent-work/numbers-ai.png",
      size: "normal",
      year: "2024",
      videoSrc: "https://res.cloudinary.com/deepcnbrz/video/upload/v1778609224/coders%20express/Copy_of_Copy_of_Video_08-_Wox_Box_b9tphy.mp4",
      videoStartTime: 5,
    },
    {
      id: "crypto-autos",
      name: "Feed Sync",
      tag: "D2C",
      image: "/images/recent-work/crypto-autos.png",
      size: "normal",
      year: "2024",
      videoSrc: "https://res.cloudinary.com/deepcnbrz/video/upload/v1778574528/coders%20express/Copy_of_Video_07-_Triple_Twist_Pen_low_res_rkhjx9.mp4",
      videoStartTime: 3,
    },
    {
      id: "moonpay",
      name: "CGI Video",
      tag: "Brand",
      image: "/images/recent-work/moonpay.png",
      size: "wide",
      year: "2023",
      videoSrc: "https://res.cloudinary.com/deepcnbrz/video/upload/v1778609175/coders%20express/Copy_of_Zomato_CGI_g9ar1j.mp4",
      videoStartTime: 6,
    },
  ],
};
