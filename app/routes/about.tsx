import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { getSiteSettings, urlFor } from "~/lib/sanity";
import { useLocale } from "~/contexts/LocaleContext";

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
  const { locale } = useLocale();

  return (
    <Layout>
      <div className="min-h-screen bg-[#DFDFDF]">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16">
          {/* Heading Section */}
          <div className="mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight uppercase">
              {siteSettings?.aboutHeading?.[locale] || 
                (locale === 'es' 
                  ? 'STUDIO-RO ES UNA PRÁCTICA DE DANZA GALARDONADA QUE TRABAJA EN UNA MEZCLA DE DISCIPLINAS QUE INCLUYE TACONES, HIP HOP, BALLET Y FLAMENCO.'
                  : 'STUDIO-RO IS AN AWARD-WINNING DANCE PRACTICE WORKING ACROSS A MIX OF DISCIPLINES THAT INCLUDES HEELS, HIP HOP, BALLET, & FLAMENCO.'
                )}
            </h1>
          </div>

          {/* Bio and Image Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Bio Section */}
            <div className="flex items-start gap-4">
              {/* Black Square Marker */}
              <div className="w-6 h-6 bg-black flex-shrink-0 mt-1"></div>
              
              {/* Bio Text */}
              <div>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                  {siteSettings?.aboutBio?.[locale] || 
                    (locale === 'es'
                      ? 'ROCIO COLOMER JORDA TIENE 15 AÑOS DE EXPERIENCIA EN DANZA. CON INFLUENCIAS DE SU PAÍS DE ORIGEN, ESPAÑA, AHORA ENSEÑA EN SAN DIEGO, CA.'
                      : 'ROCIO COLOMER JORDA HAS 15 YEARS OF DANCE EXPERIENCE. WITH INFLUENCES FROM HER HOME COUNTRY OF SPAIN, SHE NOW TEACHES IN SAN DIEGO, CA.'
                    )}
                </p>
              </div>
            </div>

            {/* Image Section */}
            {siteSettings?.aboutImage && (
              <div className="relative">
                <img 
                  src={urlFor(siteSettings.aboutImage).width(1200).url()} 
                  alt="Rocio Colomer Jorda"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
