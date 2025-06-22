import Stripes from "./Stripes";
import Logo from "./Logo";
import Timezone, { TimezoneValencia } from "./Timezone";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="flex flex-col pt-20 lg:pt-40 relative">
      <div className="flex justify-between mx-d">
        <p>© {currentYear} / STUDIO–RO</p>

        <div className="lg:flex font-base">
          <Timezone />
          <TimezoneValencia />
        </div>
        
        <div className="flex footer-links">
          <a href="https://www.instagram.com/rocii_jorda/">Instagram</a>
          <a className="ml-4" href="/contact">Contact</a>
        </div>
      </div>

      <Stripes />
      <Logo />
    </footer>
  );
}
