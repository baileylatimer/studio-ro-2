interface HomeAboutProps {
  description?: string;
}

export default function HomeAbout({ description }: HomeAboutProps) {
  return (
    <div className="home-about py-20 mx-d flex justify-end">
      <div className="content">
        <h2 className="text-indent">
          {description || 
            "Passionate about diversity and artistic expression through movement. My journey in the world of dance began 15 years ago, and since then I have explored various styles, focusing especially on heels, where I find a unique connection with my femininity and inner strength."}
        </h2>
        <svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg" role="presentation" className="blurb__svg">
          <path d="M0 0h33v33H0V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  );
}
