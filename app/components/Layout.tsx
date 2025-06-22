import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  contactInfo?: {
    usPhone?: string;
    esPhone?: string;
    email?: string;
  };
}

export default function Layout({ children, contactInfo }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow ">
        {children}
      </main>
      <Footer contactInfo={contactInfo} />
    </div>
  );
}
