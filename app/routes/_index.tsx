import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import Hero from "~/components/Hero";
import HomeAbout from "~/components/HomeAbout";
import ProjectCard from "~/components/ProjectCard";
import { getSiteSettings, getAllShowreelVideos } from "~/lib/sanity";

export const meta: MetaFunction = () => {
  return [
    { title: "STUDIO–RO® | Dance Practice by Rocio Colomer Jorda" },
    { name: "description", content: "STUDIO–RO is an award-winning dance practice founded by Rocio Colomer Jorda working across a mix of disciplines that includes Heels & Hip Hop." },
  ];
};

export const loader: LoaderFunction = async () => {
  try {
    // Fetch site settings and featured showreel videos
    const [siteSettings, showreelVideos] = await Promise.all([
      getSiteSettings(),
      getAllShowreelVideos()
    ]);

    // Get the first two videos for the homepage
    const featuredVideos = showreelVideos.slice(0, 2);

    // Debug log to check if new fields are being fetched
    console.log('Site Settings:', siteSettings);

    return { 
      siteSettings, 
      featuredVideos,
      error: null 
    };
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    return { 
      siteSettings: null, 
      featuredVideos: [],
      error: (error as Error).message || 'Failed to fetch data' 
    };
  }
};

export default function Index() {
  const { siteSettings, featuredVideos, error } = useLoaderData<typeof loader>();

  return (
    <Layout>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>}
      
        <Hero 
          videoUrl={siteSettings?.heroVideo?.asset?.url}
          description={siteSettings?.heroDescription?.en}
        />
      
      <HomeAbout description={siteSettings?.homeAboutDescription?.en} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:mt-20">
          {featuredVideos.map((video: any) => (
            <ProjectCard
              key={video._id}
              title={video.title}
              description={video.description}
              coverVideo={video.coverVideo?.asset?.url}
              mainVideo={video.mainVideo?.asset?.url}
              videoTitle={video.videoTitle}
              tag={video.tag}
              teacher={video.teacher}
              location={video.location}
              link={`/showreel/${video.tag}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
