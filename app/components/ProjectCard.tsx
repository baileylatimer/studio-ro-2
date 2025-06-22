import { useState } from "react";
import { Link } from "@remix-run/react";

interface ProjectCardProps {
  title: string;
  description?: string;
  coverVideo?: string;
  mainVideo?: string;
  videoTitle?: string;
  tag?: string;
  teacher?: string;
  location?: string;
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  coverVideo,
  mainVideo,
  videoTitle,
  tag,
  teacher,
  location,
  link = "#",
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li className={`${tag || ""} relative`}>
      <Link 
        to={link} 
        className="project-card block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="video-container">
          {coverVideo && (
            <div className="relative">
              <video
                className="w-full h-full object-cover"
                autoPlay={isHovered}
                muted
                loop
                playsInline
              >
                <source src={coverVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className={`play-btn pt-4 pl-4 items-center ${isHovered ? 'flex' : 'hidden'}`}>
                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 10L0.499999 19.5263L0.5 0.47372L17 10Z" fill="#DFDFDF"/>
                </svg>
                <p className="ml-4 text-white">Watch reel</p>
              </div>
              
              <div className="overlay-top"></div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between my-4 mx-4">
          <h1 className="">{title}</h1>
          <h1 className="lg:mt-0 color-contrast-medium">{description}</h1>
        </div>
        
        {(teacher || location) && (
          <div className="flex justify-between my-4 px-4 pt-12">
            {teacher && (
              <p className="text-alt">Choreography: {teacher}</p>
            )}
            {location && (
              <p className="lg:mt-0 color-contrast-medium text-alt">Location: {location}</p>
            )}
          </div>
        )}
      </Link>

      {/* Video Modal will be implemented separately */}
      {isModalOpen && mainVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={closeModal}
              className="absolute top-0 right-0 m-4 text-white"
            >
              Close
            </button>
            <video
              className="w-full"
              controls
              autoPlay
            >
              <source src={mainVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {videoTitle && (
              <div className="bg-black bg-opacity-75 p-4">
                <h2 className="text-white">{videoTitle}</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
