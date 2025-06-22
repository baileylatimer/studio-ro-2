import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import ProjectCard from "~/components/ProjectCard";
import { getSiteSettings, getShowreelVideosByTag } from "~/lib/sanity";

export const meta: MetaFunction = () => {
  return [
    { title: "Commercial Showreel | STUDIO–RO®" },
    { name: "description", content: "View commercial dance showreel videos from STUDIO–RO." },
  ];
};

export const loader: LoaderFunction = async () => {
  try {
    const [siteSettings, showreelVideos] = await Promise.all([
      getSiteSettings(),
      getShowreelVideosByTag('commercial')
    ]);

    return { 
      siteSettings, 
      showreelVideos,
      error: null 
    };
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    return { 
      siteSettings: null, 
      showreelVideos: [],
      error: (error as Error).message || 'Failed to fetch data' 
    };
  }
};

export default function ShowreelCommercial() {
  const { siteSettings, showreelVideos, error } = useLoaderData<typeof loader>();

  return (
    <Layout contactInfo={siteSettings?.contactInfo}>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="marquee-container relative overflow-hidden h-20 bg-contrast mb-8">
          <div className="marquee absolute top-0 left-full whitespace-nowrap">
            <h1 className="text-white inline-block mr-8">Commercial Showreel</h1>
            <h1 className="text-white inline-block mr-8">Commercial Showreel</h1>
            <h1 className="text-white inline-block mr-8">Commercial Showreel</h1>
            <h1 className="text-white inline-block mr-8">Commercial Showreel</h1>
          </div>
          <div className="marquee marquee2 absolute top-0 left-full whitespace-nowrap">
            <h1 className="text-white inline-block mr-8">Commercial Showreel</h1>
            <h1 className="text-white inline-block mr-8">Commercial Showreel</h1>
            <h1 className="text-white inline-block mr-8">Commercial Showreel</h1>
            <h1 className="text-white inline-block mr-8">Commercial Showreel</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Filter Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <a href="/showreel/all" className="btn btn--ghost inline-block">
            <span>All</span>
          </a>
          <a href="/showreel/heels" className="btn btn--ghost inline-block">
            <span>Heels</span>
          </a>
          <a href="/showreel/commercial" className="btn inline-block">
            <span>Commercial</span>
          </a>
        </div>

        {/* Video Grid */}
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {showreelVideos.map((video: any) => (
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
            />
          ))}
        </ul>
      </div>
    </Layout>
  );
}
