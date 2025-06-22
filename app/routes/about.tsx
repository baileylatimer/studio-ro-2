import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { getSiteSettings, urlFor } from "~/lib/sanity";

export const meta: MetaFunction = () => {
  return [
    { title: "About | STUDIO–RO®" },
    { name: "description", content: "Learn more about Rocio Colomer Jorda and her dance practice." },
  ];
};

export const loader: LoaderFunction = async () => {
  try {
    const siteSettings = await getSiteSettings();
    return { 
      siteSettings,
      error: null 
    };
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    return { 
      siteSettings: null,
      error: (error as Error).message || 'Failed to fetch data' 
    };
  }
};

export default function About() {
  const { siteSettings, error } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="marquee-container relative overflow-hidden h-20 bg-contrast mb-8">
          <div className="marquee absolute top-0 left-full whitespace-nowrap">
            <h1 className="text-white inline-block mr-8">About</h1>
            <h1 className="text-white inline-block mr-8">About</h1>
            <h1 className="text-white inline-block mr-8">About</h1>
            <h1 className="text-white inline-block mr-8">About</h1>
          </div>
          <div className="marquee marquee2 absolute top-0 left-full whitespace-nowrap">
            <h1 className="text-white inline-block mr-8">About</h1>
            <h1 className="text-white inline-block mr-8">About</h1>
            <h1 className="text-white inline-block mr-8">About</h1>
            <h1 className="text-white inline-block mr-8">About</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* About Image */}
        {siteSettings?.aboutImage && (
          <div className="flex w-full justify-center mb-12">
            <img 
              src={urlFor(siteSettings.aboutImage).width(2000).height(1200).url()} 
              alt="Rocio Colomer Jorda • Dance"
              className="w-full max-w-6xl h-auto object-cover"
            />
          </div>
        )}

        {/* About Text */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {siteSettings?.aboutText?.en?.map((text: string, index: number) => (
            <div key={index} className="text-card flex-1 p-8 border border-contrast">
              <svg className="blurb__svg mb-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8H12.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-justify">{text}</p>
            </div>
          ))}
        </div>

        {/* Contact Banner */}
        <div className="contact-banner mt-16 p-12 bg-contrast text-center">
          <h2 className="text-white mb-4">Get in Touch</h2>
          <a href="/contact" className="btn btn--ghost inline-block">
            <span className="text-white">Contact</span>
          </a>
        </div>
      </div>
    </Layout>
  );
}
