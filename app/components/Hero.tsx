import { useRef, useEffect } from "react";

interface HeroProps {
  videoUrl?: string;
  description?: string;
  text1?: string;
  text2?: string;
}

export default function Hero({ videoUrl, description, text1 = "RO", text2 = "CIO" }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  return (
    <div className="hero relative h-screen w-full overflow-hidden">
      {videoUrl && (
        <video
          ref={videoRef}
          className="background-video absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}


<div className="ro absolute top-[90px] left-[40px] lg:top-[90px] lg:left-[40px]">
          <h1 className="text-xxl text-white">{text1}</h1>
        </div>
        
        <div className="cio absolute bottom-[60px] right-[20px]">
          <h1 className="text-xxl text-white">{text2}</h1>
        </div>
        
        {description && (
          <div className="hero-desc absolute bottom-[40px] left-[40px] lg:left-[40px] max-w-[360px] text-justify">
            <p className="text-white">{description}</p>
          </div>
        )}

      <div className="overlay-bottom pointer-events-none absolute bottom-0 left-0 right-0 w-full h-[700px] z-0 flex items-end justify-start">

      </div>
    </div>
  );
}
