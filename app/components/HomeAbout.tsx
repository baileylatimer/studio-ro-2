import { Link } from "@remix-run/react";

interface HomeAboutProps {
  description?: string;
}

export default function HomeAbout({ description }: HomeAboutProps) {
  return (
    <section className="home-about py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="content max-w-[700px] mx-auto">
          <div className="text-indent relative">
            <svg className="blurb__svg absolute top-[0.1em] left-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            <p className="mb-6">
              {description || 
                "Passionate about diversity and artistic expression through movement. My journey in the world of dance began 15 years ago, and since then I have explored various styles, focusing especially on heels, where I find a unique connection with my femininity and inner strength."}
            </p>
          </div>
          
          <div className="flex justify-center mt-8">
            <Link 
              to="/about" 
              className="btn inline-block"
            >
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
