import { Link } from "@remix-run/react";

interface FooterProps {
  contactInfo?: {
    usPhone?: string;
    esPhone?: string;
    email?: string;
  };
}

export default function Footer({ contactInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-contrast py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <h3 className="text-md mb-4">STUDIO–RO®</h3>
            <p className="mb-2">Dance practice founded by Rocio Colomer Jorda</p>
            <p>© {currentYear} All rights reserved</p>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-md mb-4">Contact</h3>
            {contactInfo?.usPhone && (
              <p className="mb-2">US: {contactInfo.usPhone}</p>
            )}
            {contactInfo?.esPhone && (
              <p className="mb-2">ES: {contactInfo.esPhone}</p>
            )}
            {contactInfo?.email && (
              <p className="mb-2">
                <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                  {contactInfo.email}
                </a>
              </p>
            )}
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-md mb-4">Links</h3>
            <Link to="/showreel/all" className="mb-2 hover:underline">
              Showreel
            </Link>
            <Link to="/about" className="mb-2 hover:underline">
              About
            </Link>
            <Link to="/contact" className="mb-2 hover:underline">
              Contact
            </Link>
            <Link to="/book" className="mb-2 hover:underline">
              Book a Class
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
