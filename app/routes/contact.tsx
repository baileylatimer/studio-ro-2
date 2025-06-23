import type { MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact | STUDIO–RO®" },
    { name: "description", content: "Get in touch with STUDIO–RO®" },
  ];
};

export default function Contact() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#DFDFDF]">
        {/* Page Header */}
        <div className="container mx-auto px-4 lg:px-8 pt-32 pb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-center">Contact</h1>
        </div>

        {/* Contact Info */}
        <div className="contact flex flex-col lg:flex-row lg:gap-12 justify-center items-center py-24 lg:py-40 text-xl lg:text-2xl">
          <a href="tel:+13235742422" className="hover:underline mb-4 lg:mb-0">US: +1 (323) 574-2422</a>
          <a href="tel:+34655647995" className="hover:underline mb-4 lg:mb-0">ES: +34 655 647 995</a>
          <a href="mailto:hi@rocio.dance" className="hover:underline">hi@rocio.dance</a>
        </div>
      </div>
    </Layout>
  );
}
