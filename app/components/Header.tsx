import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@remix-run/react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (typeof window === "undefined" || !navRef.current) return;

    // Dynamically import GSAP only on client side
    const setupScrollTrigger = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      
      gsap.registerPlugin(ScrollTrigger);

      // Set initial state based on page
      if (isHomePage) {
        // On homepage, start transparent with light text
        gsap.set(navRef.current, {
          backgroundColor: "transparent",
          borderColor: "transparent",
          color: "#DFDFDF",
          "--nav-text-color": "#DFDFDF",
          "--nav-svg-fill": "#DFDFDF"
        });

        // Apply light colors to all text elements and SVGs
        const textElements = navRef.current?.querySelectorAll('a:not([href="/book"])');
        const svgElements = navRef.current?.querySelectorAll('.nav-logo path, .nav-logo rect');
        const bookButton = navRef.current?.querySelector('a[href="/book"]');
        const bookButtonSvg = bookButton?.querySelector('svg path');
        const languageButtons = navRef.current?.querySelectorAll('button[class*="ring"]');
        const hamburgerSvg = navRef.current?.querySelector('button svg rect');
        
        textElements?.forEach(el => {
          gsap.set(el, { color: "#DFDFDF" });
        });
        svgElements?.forEach(el => {
          gsap.set(el, { fill: "#DFDFDF" });
        });
        
        // Update language switcher ring colors
        languageButtons?.forEach(button => {
          if (button.classList.contains('ring-2')) {
            gsap.set(button, { '--tw-ring-color': '#DFDFDF' });
          }
        });
        
        // Keep book button background but change text
        if (bookButton) {
          gsap.set(bookButton, { 
            backgroundColor: "#000000",
            color: "#DFDFDF"
          });
        }
        // Book button arrow should stay light
        if (bookButtonSvg) {
          gsap.set(bookButtonSvg, { stroke: "#DFDFDF" });
        }


        // Create ScrollTrigger for hero section
        const heroElement = document.querySelector(".hero");
        if (heroElement) {
          ScrollTrigger.create({
            trigger: heroElement,
            start: "bottom top+=100",
            end: "bottom top",
            onEnter: () => {
              // Transition to white background with dark text
              gsap.to(navRef.current, {
                backgroundColor: "var(--color-bg)",
                borderColor: "var(--color-contrast-higher)",
                color: "var(--color-contrast-higher)",
                "--nav-text-color": "var(--color-contrast-higher)",
                "--nav-svg-fill": "var(--color-contrast-higher)",
                duration: 0.3,
                ease: "power2.inOut"
              });
              
              const textElements = navRef.current?.querySelectorAll('a:not([href="/book"]), span, button');
              const svgElements = navRef.current?.querySelectorAll('.nav-logo path, .nav-logo rect, button > svg rect');
              const bookButton = navRef.current?.querySelector('a[href="/book"]');
              const bookButtonSvg = bookButton?.querySelector('svg path');
              const languageButtons = navRef.current?.querySelectorAll('.flex.justify-center.items-center.gap-2 button');
              
              textElements?.forEach(el => {
                gsap.to(el, { color: "var(--color-contrast-higher)", duration: 0.3 });
              });
              svgElements?.forEach(el => {
                gsap.to(el, { fill: "var(--color-contrast-higher)", duration: 0.3 });
              });
              
              // Update language switcher ring colors
              languageButtons?.forEach(button => {
                if (button.classList.contains('ring-2')) {
                  gsap.to(button, { '--tw-ring-color': '#000000', duration: 0.3 });
                }
              });
              
              // Book button maintains black background
              if (bookButton) {
                gsap.to(bookButton, { 
                  backgroundColor: "#000000",
                  color: "#DFDFDF",
                  duration: 0.3
                });
              }
              // Book button arrow stays light
              if (bookButtonSvg) {
                gsap.to(bookButtonSvg, { stroke: "#DFDFDF", duration: 0.3 });
              }
            },
            onLeaveBack: () => {
              // Transition back to transparent with light text
              gsap.to(navRef.current, {
                backgroundColor: "transparent",
                borderColor: "transparent",
                color: "#DFDFDF",
                "--nav-text-color": "#DFDFDF",
                "--nav-svg-fill": "#DFDFDF",
                duration: 0.3,
                ease: "power2.inOut"
              });
              
              const textElements = navRef.current?.querySelectorAll('a:not([href="/book"]), span, button');
              const svgElements = navRef.current?.querySelectorAll('.nav-logo path, .nav-logo rect, button > svg rect');
              const bookButton = navRef.current?.querySelector('a[href="/book"]');
              const bookButtonSvg = bookButton?.querySelector('svg path');
              const languageButtons = navRef.current?.querySelectorAll('.flex.justify-center.items-center.gap-2 button');
              
              textElements?.forEach(el => {
                gsap.to(el, { color: "#DFDFDF", duration: 0.3 });
              });
              svgElements?.forEach(el => {
                gsap.to(el, { fill: "#DFDFDF", duration: 0.3 });
              });
              
              // Update language switcher ring colors
              languageButtons?.forEach(button => {
                if (button.classList.contains('ring-2')) {
                  gsap.to(button, { '--tw-ring-color': '#DFDFDF', duration: 0.3 });
                }
              });
              
              // Book button maintains black background
              if (bookButton) {
                gsap.to(bookButton, { 
                  backgroundColor: "#000000",
                  color: "#DFDFDF",
                  duration: 0.3
                });
              }
              // Book button arrow stays light
              if (bookButtonSvg) {
                gsap.to(bookButtonSvg, { stroke: "#DFDFDF", duration: 0.3 });
              }
            }
          });
        }
      } else {
        // On other pages, always show background with dark text
        gsap.set(navRef.current, {
          backgroundColor: "var(--color-bg)",
          borderColor: "var(--color-contrast-higher)",
          color: "var(--color-contrast-higher)",
          "--nav-text-color": "var(--color-contrast-higher)",
          "--nav-svg-fill": "var(--color-contrast-higher)"
        });
      }
    };

    setupScrollTrigger().then(() => {
      // Hero logo animation setup (only on homepage)
      if (isHomePage) {
        setTimeout(() => {
          const heroLogo = document.querySelector('#hero-logo') as HTMLElement;
          const navPlaceholder = document.querySelector('#nav-logo-placeholder');
          
          if (heroLogo && navPlaceholder) {
            import("gsap").then(({ gsap }) => {
              import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                
                const setupAnimation = () => {
                  // Get positions and sizes
                  const heroRect = heroLogo.getBoundingClientRect();
                  const navRect = navPlaceholder.getBoundingClientRect();
                  
                  // Calculate the scale needed
                  const targetHeight = 31; // Nav logo height
                  const currentHeight = heroRect.height;
                  const scaleFactor = targetHeight / currentHeight;
                  
                  // Calculate the center points
                  const heroCenterX = heroRect.left + (heroRect.width / 2);
                  const heroCenterY = heroRect.top + (heroRect.height / 2);
                  const navCenterX = navRect.left + (navRect.width / 2);
                  const navCenterY = navRect.top + (navRect.height / 2);
                  
                  // Calculate the position difference (center to center)
                  const xDiff = navCenterX - heroCenterX;
                  const yDiff = navCenterY - heroCenterY;
                  
                  // Store original styles
                  const originalPosition = window.getComputedStyle(heroLogo).position;
                  const originalTop = window.getComputedStyle(heroLogo).top;
                  const originalLeft = window.getComputedStyle(heroLogo).left;
                  
                  // Kill existing ScrollTriggers for this element
                  ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.vars.id === "hero-logo-animation" || trigger.vars.id === "hero-logo-color") {
                      trigger.kill();
                    }
                  });

                  // Create the main animation
                  let isFixed = false;
                  
                  ScrollTrigger.create({
                    id: "hero-logo-animation",
                    trigger: ".hero",
                    start: "top top",
                    end: "top top-=200", // Much shorter scroll distance for faster animation
                    scrub: 0.5, // Smoother scrub
                    onUpdate: (self) => {
                      const progress = self.progress;
                      
                      if (progress > 0 && !isFixed) {
                        // Switch to fixed positioning
                        isFixed = true;
                        gsap.set(heroLogo, {
                          position: "fixed",
                          left: heroRect.left,
                          top: heroRect.top,
                          zIndex: 60,
                          width: heroRect.width,
                          height: heroRect.height
                        });
                      } else if (progress === 0 && isFixed) {
                        // Switch back to original positioning
                        isFixed = false;
                        gsap.set(heroLogo, {
                          position: originalPosition,
                          left: originalLeft,
                          top: originalTop,
                          zIndex: "auto",
                          width: "auto",
                          height: "auto",
                          x: 0,
                          y: 0,
                          scale: 1
                        });
                      }
                      
                      if (isFixed) {
                        // Animate position and scale
                        gsap.set(heroLogo, {
                          x: xDiff * progress,
                          y: yDiff * progress,
                          scale: 1 - (1 - scaleFactor) * progress,
                          transformOrigin: "center center"
                        });
                      }
                    }
                  });

                  // Color transition tied to nav background change
                  ScrollTrigger.create({
                    id: "hero-logo-color",
                    trigger: ".hero",
                    start: "bottom top+=100",
                    end: "bottom top",
                    onEnter: () => {
                      gsap.to(heroLogo, {
                        color: "var(--color-contrast-higher)",
                        duration: 0.3
                      });
                      // Also change the superscript color
                      const superscript = heroLogo.querySelector('span');
                      if (superscript) {
                        gsap.to(superscript, {
                          color: "var(--color-contrast-higher)",
                          duration: 0.3
                        });
                      }
                    },
                    onLeaveBack: () => {
                      gsap.to(heroLogo, {
                        color: "#FFFFFF",
                        duration: 0.3
                      });
                      // Also change the superscript color back
                      const superscript = heroLogo.querySelector('span');
                      if (superscript) {
                        gsap.to(superscript, {
                          color: "#FFFFFF",
                          duration: 0.3
                        });
                      }
                    }
                  });
                };

                // Initial setup
                setupAnimation();

                // Update on resize
                const resizeHandler = () => {
                  setupAnimation();
                };
                window.addEventListener('resize', resizeHandler);
                
                // Store resize handler for cleanup
                const extWindow = window as Window & { __heroLogoResizeHandler?: () => void };
                extWindow.__heroLogoResizeHandler = resizeHandler;
              });
            });
          }
        }, 100); // Small delay to ensure DOM is ready
      }
    });

    // Cleanup
    return () => {
      // Clean up ScrollTrigger instances
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      });
      
      // Remove any cloned elements
      const clonedLogo = document.querySelector('#hero-logo-animated');
      if (clonedLogo && clonedLogo.parentNode) {
        clonedLogo.parentNode.removeChild(clonedLogo);
      }
      
      // Remove resize listener
      const extWindow = window as Window & { __heroLogoResizeHandler?: () => void };
      if (extWindow.__heroLogoResizeHandler) {
        window.removeEventListener('resize', extWindow.__heroLogoResizeHandler);
        delete extWindow.__heroLogoResizeHandler;
      }
    };
  }, [isHomePage, location.pathname]);

  return (
    <nav 
      ref={navRef}
      className="py-3 lg:p-6 mx-d mb-6 border rounded-xl fixed w-[calc(100vw-80px)] z-50 top-4 mx-4"
      style={{ transition: 'background-color 0.3s ease, border-color 0.3s ease' }}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 items-center">
        {/* Left: Menu Items */}
        <div className="flex items-center pl-6">
          <Link
            to="/about"
            className="mr-6 whitespace-nowrap text-sm"
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            className="whitespace-nowrap text-sm"
          >
            CONTACT
          </Link>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center">
          {!isHomePage && (
            <Link to="/" className="nav-title">
              <svg className="nav-logo" width="242" height="31" viewBox="0 0 242 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3237 12.9039C9.31053 11.9007 6.62171 11.3388 6.62171 8.20855C6.62171 6.08158 8.66842 4.79737 12.0796 4.79737C16.0526 4.79737 18.1395 6.56316 18.5809 9.89408H23.3566C22.9553 3.99474 18.3803 0.703946 12.0796 0.703946C5.81908 0.703946 1.88618 3.55329 1.88618 8.65C1.88618 14.1079 6.74211 15.8336 11.2368 16.9572C16.8954 18.3618 19.3434 19.0039 19.3434 22.4151C19.3434 24.6224 17.698 26.5086 13.4441 26.5086C8.30724 26.5086 5.81908 24.1007 5.57829 20.4487H0.802632C1.08355 26.95 6.42105 30.602 13.4441 30.602C20.6678 30.602 24.1191 26.7895 24.1191 22.2145C24.1191 15.7934 19.4638 14.4691 13.3237 12.9039ZM32.8913 30H37.6669V5.35921H46.8169V1.30592H23.7011V5.35921H32.8913V30ZM71.105 20.2079V1.30592H66.3695V20.2079C66.3695 24.5421 64.2024 26.5086 59.7879 26.5086C55.4136 26.5086 53.2465 24.5421 53.2465 20.2079V1.30592H48.4708V20.2079C48.4708 26.4684 51.8017 30.602 59.7879 30.602C67.7741 30.602 71.105 26.4684 71.105 20.2079ZM74.4356 30H85.7126C93.6586 30 98.354 24.9033 98.354 15.673C98.354 6.44276 93.4981 1.30592 85.5922 1.30592H74.4356V30ZM79.2113 5.35921H85.3514C91.7725 5.35921 93.5784 10.175 93.5784 15.673C93.5784 21.1711 91.7725 25.9467 85.3514 25.9467H79.2113V5.35921ZM101.059 1.30592V30H105.835V1.30592H101.059ZM122.771 30.602C131.4 30.602 136.857 24.2612 136.857 15.6329C136.857 7.0046 131.4 0.703946 122.771 0.703946C114.103 0.703946 108.685 7.0046 108.685 15.6329C108.685 24.2612 114.103 30.602 122.771 30.602ZM122.771 26.5086C116.19 26.5086 113.421 21.452 113.421 15.6329C113.421 9.85395 116.19 4.79737 122.771 4.79737C129.353 4.79737 132.082 9.85395 132.082 15.6329C132.082 21.452 129.353 26.5086 122.771 26.5086Z" fill="black"/>
                <path d="M169.694 13.1122L141 13.1122L141 17.8878L169.694 17.8878L169.694 13.1122Z" fill="black"/>
                <path d="M174.142 30H178.918V18.9237H185.941C192.843 18.9237 190.155 28.7961 191.479 30H196.495V29.7191C194.97 29.2375 197.378 18.0007 190.757 16.7566V16.6763C194.047 15.8737 196.094 13.5461 196.094 9.53289C196.094 4.31579 192.282 1.30592 186.382 1.30592H174.142V30ZM178.918 5.35921H185.379C188.309 5.35921 191.359 5.96118 191.359 10.0947C191.359 14.2684 188.309 14.8303 185.379 14.8303H178.918V5.35921ZM211.807 30.602C220.435 30.602 225.893 24.2612 225.893 15.6329C225.893 7.0046 220.435 0.703946 211.807 0.703946C203.138 0.703946 197.721 7.0046 197.721 15.6329C197.721 24.2612 203.138 30.602 211.807 30.602ZM211.807 26.5086C205.225 26.5086 202.456 21.452 202.456 15.6329C202.456 9.85395 205.225 4.79737 211.807 4.79737C218.388 4.79737 221.117 9.85395 221.117 15.6329C221.117 21.452 218.388 26.5086 211.807 26.5086Z" fill="black"/>
                <path d="M234.704 16C238.997 16 241.694 12.8072 241.694 8.51004C241.694 4.21285 238.997 1 234.704 1C230.411 1 227.694 4.21285 227.694 8.51004C227.694 12.8072 230.411 16 234.704 16ZM234.704 14.996C230.98 14.996 228.834 12.1847 228.834 8.51004C228.834 4.81526 230.98 2.00402 234.704 2.00402C238.408 2.00402 240.554 4.81526 240.554 8.51004C240.554 12.1847 238.408 14.996 234.704 14.996ZM236.071 7.4257H238.522C238.332 5.45783 237.002 3.99197 234.666 3.99197C232.196 3.99197 230.676 5.87952 230.676 8.51004C230.676 11.1606 232.272 13.008 234.818 13.008C237.116 13.008 238.408 11.5422 238.522 9.55422H236.071C235.995 10.3173 235.729 11.0201 234.723 11.0201C233.678 11.0201 233.184 10.0964 233.184 8.51004C233.184 6.90362 233.678 5.97992 234.723 5.97992C235.729 5.97992 235.995 6.74297 236.071 7.4257Z" fill="black"/>
              </svg>
            </Link>
          )}
          {isHomePage && (
            <div id="nav-logo-placeholder" className="nav-logo-placeholder" style={{ width: '242px', height: '31px' }}></div>
          )}
        </div>

        {/* Right: Language Switcher + Book Now */}
        <div className="flex items-center justify-end gap-4 pr-6">
          <LanguageSwitcher />
          <Link
            to="/book"
            className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 text-sm"
          >
            BOOK NOW
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5H15M15 1.5V15.5M15 1.5L1 15.5" stroke="#DFDFDF" strokeWidth="2"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden grid grid-cols-2">
        <div className="flex items-center">
          <Link to="/" className="nav-title">
            <svg className="nav-logo" width="180" height="24" viewBox="0 0 242 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3237 12.9039C9.31053 11.9007 6.62171 11.3388 6.62171 8.20855C6.62171 6.08158 8.66842 4.79737 12.0796 4.79737C16.0526 4.79737 18.1395 6.56316 18.5809 9.89408H23.3566C22.9553 3.99474 18.3803 0.703946 12.0796 0.703946C5.81908 0.703946 1.88618 3.55329 1.88618 8.65C1.88618 14.1079 6.74211 15.8336 11.2368 16.9572C16.8954 18.3618 19.3434 19.0039 19.3434 22.4151C19.3434 24.6224 17.698 26.5086 13.4441 26.5086C8.30724 26.5086 5.81908 24.1007 5.57829 20.4487H0.802632C1.08355 26.95 6.42105 30.602 13.4441 30.602C20.6678 30.602 24.1191 26.7895 24.1191 22.2145C24.1191 15.7934 19.4638 14.4691 13.3237 12.9039ZM32.8913 30H37.6669V5.35921H46.8169V1.30592H23.7011V5.35921H32.8913V30ZM71.105 20.2079V1.30592H66.3695V20.2079C66.3695 24.5421 64.2024 26.5086 59.7879 26.5086C55.4136 26.5086 53.2465 24.5421 53.2465 20.2079V1.30592H48.4708V20.2079C48.4708 26.4684 51.8017 30.602 59.7879 30.602C67.7741 30.602 71.105 26.4684 71.105 20.2079ZM74.4356 30H85.7126C93.6586 30 98.354 24.9033 98.354 15.673C98.354 6.44276 93.4981 1.30592 85.5922 1.30592H74.4356V30ZM79.2113 5.35921H85.3514C91.7725 5.35921 93.5784 10.175 93.5784 15.673C93.5784 21.1711 91.7725 25.9467 85.3514 25.9467H79.2113V5.35921ZM101.059 1.30592V30H105.835V1.30592H101.059ZM122.771 30.602C131.4 30.602 136.857 24.2612 136.857 15.6329C136.857 7.0046 131.4 0.703946 122.771 0.703946C114.103 0.703946 108.685 7.0046 108.685 15.6329C108.685 24.2612 114.103 30.602 122.771 30.602ZM122.771 26.5086C116.19 26.5086 113.421 21.452 113.421 15.6329C113.421 9.85395 116.19 4.79737 122.771 4.79737C129.353 4.79737 132.082 9.85395 132.082 15.6329C132.082 21.452 129.353 26.5086 122.771 26.5086Z" fill="black"/>
              <path d="M169.694 13.1122L141 13.1122L141 17.8878L169.694 17.8878L169.694 13.1122Z" fill="black"/>
              <path d="M174.142 30H178.918V18.9237H185.941C192.843 18.9237 190.155 28.7961 191.479 30H196.495V29.7191C194.97 29.2375 197.378 18.0007 190.757 16.7566V16.6763C194.047 15.8737 196.094 13.5461 196.094 9.53289C196.094 4.31579 192.282 1.30592 186.382 1.30592H174.142V30ZM178.918 5.35921H185.379C188.309 5.35921 191.359 5.96118 191.359 10.0947C191.359 14.2684 188.309 14.8303 185.379 14.8303H178.918V5.35921ZM211.807 30.602C220.435 30.602 225.893 24.2612 225.893 15.6329C225.893 7.0046 220.435 0.703946 211.807 0.703946C203.138 0.703946 197.721 7.0046 197.721 15.6329C197.721 24.2612 203.138 30.602 211.807 30.602ZM211.807 26.5086C205.225 26.5086 202.456 21.452 202.456 15.6329C202.456 9.85395 205.225 4.79737 211.807 4.79737C218.388 4.79737 221.117 9.85395 221.117 15.6329C221.117 21.452 218.388 26.5086 211.807 26.5086Z" fill="black"/>
              <path d="M234.704 16C238.997 16 241.694 12.8072 241.694 8.51004C241.694 4.21285 238.997 1 234.704 1C230.411 1 227.694 4.21285 227.694 8.51004C227.694 12.8072 230.411 16 234.704 16ZM234.704 14.996C230.98 14.996 228.834 12.1847 228.834 8.51004C228.834 4.81526 230.98 2.00402 234.704 2.00402C238.408 2.00402 240.554 4.81526 240.554 8.51004C240.554 12.1847 238.408 14.996 234.704 14.996ZM236.071 7.4257H238.522C238.332 5.45783 237.002 3.99197 234.666 3.99197C232.196 3.99197 230.676 5.87952 230.676 8.51004C230.676 11.1606 232.272 13.008 234.818 13.008C237.116 13.008 238.408 11.5422 238.522 9.55422H236.071C235.995 10.3173 235.729 11.0201 234.723 11.0201C233.678 11.0201 233.184 10.0964 233.184 8.51004C233.184 6.90362 233.678 5.97992 234.723 5.97992C235.729 5.97992 235.995 6.74297 236.071 7.4257Z" fill="black"/>
            </svg>
          </Link>
        </div>

        <div className="flex justify-end items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center px-3 py-2"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="9" width="25" height="2" fill="black"/>
              <rect x="1" y="17" width="25" height="2" fill="black"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isExpanded ? `block` : `hidden`
        } lg:hidden w-full nav-open mt-4 pt-4 px-d`}
      >
        <div className="text-sm flex flex-col">
          <Link
            to="/about"
            className="block mt-4"
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            className="block mt-4"
          >
            CONTACT
          </Link>
          <Link
            to="/book"
            className="block mt-4 bg-black text-white px-4 py-2 rounded-full text-center"
          >
            BOOK NOW
          </Link>
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
