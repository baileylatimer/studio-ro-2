import type { MetaFunction } from "@remix-run/node";
import { useEffect } from "react";
import Layout from "~/components/Layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Book Reggaeton X Heels Class | STUDIO–RO®" },
    { name: "description", content: "Unleash your inner fire. Book your Reggaeton X Heels dance class with Rocio and discover the power of movement." },
  ];
};

export default function Book() {

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
            UNLEASH YOUR INNER FIRE
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mt-16">
            Join Rocio's Reggaeton X Heels fusion class and discover the power of movement, confidence, and self-expression
          </p>
        </div>

        {/* Calendly Widget */}
        <div 
          className="calendly-inline-widget" 
          data-url="https://calendly.com/rocojor-dnc/reggaeton-x-heels-class?hide_event_type_details=1&hide_gdpr_banner=1&background_color=dfdfdf" 
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </Layout>
  );
}
