import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { getSiteSettings, getAllClasses } from "~/lib/sanity";

export const meta: MetaFunction = () => {
  return [
    { title: "Book a Class | STUDIO–RO®" },
    { name: "description", content: "Book your next dance class with STUDIO–RO." },
  ];
};

export const loader: LoaderFunction = async () => {
  try {
    const [siteSettings, classes] = await Promise.all([
      getSiteSettings(),
      getAllClasses()
    ]);

    return { 
      siteSettings, 
      classes,
      error: null 
    };
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    return { 
      siteSettings: null, 
      classes: [],
      error: (error as Error).message || 'Failed to fetch data' 
    };
  }
};

export default function Book() {
  const { siteSettings, classes, error } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="marquee-container relative overflow-hidden h-20 bg-contrast mb-8">
          <div className="marquee absolute top-0 left-full whitespace-nowrap">
            <h1 className="text-white inline-block mr-8">Book a Class</h1>
            <h1 className="text-white inline-block mr-8">Book a Class</h1>
            <h1 className="text-white inline-block mr-8">Book a Class</h1>
            <h1 className="text-white inline-block mr-8">Book a Class</h1>
          </div>
          <div className="marquee marquee2 absolute top-0 left-full whitespace-nowrap">
            <h1 className="text-white inline-block mr-8">Book a Class</h1>
            <h1 className="text-white inline-block mr-8">Book a Class</h1>
            <h1 className="text-white inline-block mr-8">Book a Class</h1>
            <h1 className="text-white inline-block mr-8">Book a Class</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Coming Soon Message */}
        {classes.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-2xl mb-4">Classes Coming Soon!</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              We're excited to announce that online booking for dance classes will be available soon. 
              In the meantime, please contact us directly to inquire about class schedules and availability.
            </p>
            <a href="/contact" className="btn inline-block">
              <span>Contact Us</span>
            </a>
          </div>
        ) : (
          /* Classes Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem: any) => (
              <div key={classItem._id} className="border border-contrast p-6">
                {classItem.image && (
                  <img 
                    src={classItem.image.asset?.url} 
                    alt={classItem.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                )}
                <h3 className="text-xl mb-2">{classItem.title}</h3>
                <p className="text-sm mb-2 uppercase">{classItem.type}</p>
                <p className="mb-4">{classItem.description?.en}</p>
                <p className="text-sm mb-4">Instructor: {classItem.teacher}</p>
                
                {/* Class Dates */}
                {classItem.dates && classItem.dates.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Upcoming Sessions:</h4>
                    {classItem.dates.map((date: any, index: number) => (
                      <div key={index} className="text-sm mb-2">
                        <p>{new Date(date.date).toLocaleDateString()} - ${date.price}</p>
                        <p>{date.location}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <button className="btn w-full" disabled>
                  <span>Book Now (Coming Soon)</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
