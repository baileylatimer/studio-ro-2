import { useRef, useEffect } from "react";

interface HeroProps {
  videoUrl?: string;
  description?: string;
}

export default function Hero({ videoUrl, description }: HeroProps) {
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


<div className="absolute top-[90px] left-0 w-full px-[40px]">
          <h1 id="hero-logo" className="text-white whitespace-nowrap hero-logo" style={{ fontSize: 'calc(100vw / 9.5)', fontFamily: '"PP Neue Corp"' }}>
            STUDIO–RO<span className="text-white" style={{ fontSize: '0.5em', verticalAlign: 'super' }}>©</span>
          </h1>
        </div>
        

        
      {/* Gradient overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-10"
        style={{
          background: 'linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)',
          height: '320px'
        }}
      />

      {/* Description and pill */}
      {description && (
        <div className="absolute bottom-0 left-0 right-0 w-full flex flex-col items-center justify-end pb-[40px] z-20">
          <h3 className="text-white text-center max-w-[600px] px-4 mb-4">{description}</h3>
          <div 
            className="text-white text-sm uppercase"
            style={{
              display: 'flex',
              width: '199px',
              padding: '5px 0px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '30px',
              background: 'rgba(255, 255, 255, 0.10)'
            }}
          >
            BY ROCIO COLOMER JORDA
          </div>
        </div>
      )}
    </div>
  );
}
