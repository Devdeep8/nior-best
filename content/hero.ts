/**
 * Hero Section Content Data
 * All text, links, and configuration for the hero component
 * Based on Mixspace Studio hero section
 */

export interface HeroContent {
  // Main headline - split into two lines
  headline: {
    line1: string;
    line2: string;
    ariaLabel: string;
  };

  // Description text (on the right side in image)
  description: {
    text: string;
    ariaLabel: string;
  };

  // CTA button (in navbar, top-right)
  ctaButton: {
    label: string;
    href: string;
    ariaLabel: string;
  };

  // Video background
  video: {
    src: string;
    alt: string;
    fallbackColor: string;
    thumbnailVideoSrc?: string; // mp4 direct — or YouTube URL (auto-detected)
    recommendedVideos?: {
      id: string;
      title: string;
      src: string;
    }[];
  };

  // Animation timing
  animation: {
    line1Delay: number;
    line2Delay: number;
    descriptionDelay: number;
    thumbnailDelay: number;
    duration: number;
  };
}

export const heroContent: HeroContent = {
  headline: {
    line1: "Scale Your Business,",
    line2: "Not Your Overhead.",
    ariaLabel: "Scale Your Business, Not Your Overhead.",
  },

  description: {
    text: "Stop wasting money on agencies selling empty impressions. We design high-performance web systems and digital campaigns that cut customer acquisition costs by up to 40%. You get direct revenue growth, not tech jargon.",
    ariaLabel: "Stop wasting money on agencies selling empty impressions. We design high-performance web systems and digital campaigns that cut customer acquisition costs by up to 40%. You get direct revenue growth, not tech jargon.",
  },

  ctaButton: {
    label: "Message us on WhatsApp",
    href: "https://wa.me/message/HHILA74EGXT4K1",
    ariaLabel: "Message us on WhatsApp to start saving now",
  },

  video: {
    src: "/assets/video/IMG_5724.MP4",
    alt: "Abstract dark video background with futuristic visual effects",
    fallbackColor: "#0a0a0a",
    // OLD urls (swap back by pasting one as thumbnailVideoSrc value):
    // "https://res.cloudinary.com/deepcnbrz/video/upload/f_auto,q_auto/v1778743838/coders%20express/volvo_ryz9sp.mp4"
    // "https://www.youtube.com/watch?v=Ro_3DJ9w0cI"
    thumbnailVideoSrc: "https://res.cloudinary.com/deepcnbrz/video/upload/f_auto,q_auto/v1783592510/video6230893928879497424_j7wkzf.mp4",
    recommendedVideos: [
      {
        id: "rec-1",
        title: "McLaren Studio",
        src: "https://res.cloudinary.com/deepcnbrz/video/upload/f_auto,q_auto/v1778609300/coders%20express/Copy_of_McLaren_studio_edit_o5jm4d.mp4"
      },
      {
        id: "rec-2",
        title: "KartPipe Project",
        src: "https://res.cloudinary.com/deepcnbrz/video/upload/f_auto,q_auto/v1778608880/coders%20express/Copy_of_Video_06-_KartPipe_low_res_jggtyy.mp4"
      },
      {
        id: "rec-3",
        title: "Sikret Shoot",
        src: "https://res.cloudinary.com/deepcnbrz/video/upload/f_auto,q_auto/v1778608811/coders%20express/Copy_of_Video_05-_Sikret_low_res_jj06rm.mp4"
      }
    ]
  },

  animation: {
    line1Delay: 0.8,
    line2Delay: 1.0,
    descriptionDelay: 1.5,
    thumbnailDelay: 2.0,
    duration: 0.8,
  },
} as const;

export type HeroContentType = typeof heroContent;
