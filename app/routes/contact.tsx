import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { getSiteSettings } from "~/lib/sanity";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact | STUDIO–RO®" },
    { name: "description", content: "Get in touch with STUDIO–RO." },
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

export default function Contact() {
  const { siteSettings, error } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="marquee-container relative overflow-hidden h-20 bg-contrast mb-8">
          <div className="marquee absolute top-0 left-full whitespace-nowrap">
            <h1 className="text-white inline-block mr-8">Contact</h1>
            <h1 className="text-white inline-block mr-8">Contact</h1>
            <h1 className="text-white inline-block mr-8">Contact</h1>
            <h1 className="text-white inline-block mr-8">Contact</h1>
          </div>
          <div className="marquee marquee2 absolute top-0 left-full whitespace-nowrap">
            <h1 className="text-white inline-block mr-8">Contact</h1>
            <h1 className="text-white inline-block mr-8">Contact</h1>
            <h1 className="text-white inline-block mr-8">Contact</h1>
            <h1 className="text-white inline-block mr-8">Contact</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Contact Information */}
        <div className="contact flex flex-col lg:flex-row lg:gap-12 justify-center items-center py-24 lg:py-40">
          {siteSettings?.contactInfo?.usPhone && (
            <a 
              href={`tel:${siteSettings.contactInfo.usPhone}`}
              className="text-2xl hover:underline mb-4 lg:mb-0"
            >
              US: {siteSettings.contactInfo.usPhone}
            </a>
          )}
          
          {siteSettings?.contactInfo?.esPhone && (
            <a 
              href={`tel:${siteSettings.contactInfo.esPhone}`}
              className="text-2xl hover:underline mb-4 lg:mb-0"
            >
              ES: {siteSettings.contactInfo.esPhone}
            </a>
          )}
          
          {siteSettings?.contactInfo?.email && (
            <a 
              href={`mailto:${siteSettings.contactInfo.email}`}
              className="text-2xl hover:underline"
            >
              {siteSettings.contactInfo.email}
            </a>
          )}
        </div>

        {/* Social Media Links */}
        {siteSettings?.socialMedia && siteSettings.socialMedia.length > 0 && (
          <div className="flex justify-center gap-8 mt-12">
            {siteSettings.socialMedia.map((social: any, index: number) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:underline"
              >
                {social.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
