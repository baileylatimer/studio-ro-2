import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@remix-run/react";
import LanguageSwitcher from "./LanguageSwitcher";
import Stripes from "./Stripes";

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
                  // Check if mobile
                  const isMobile = window.innerWidth < 1024; // lg breakpoint
                  
                  // Get positions and sizes
                  const heroRect = heroLogo.getBoundingClientRect();
                  const navRect = navPlaceholder ? navPlaceholder.getBoundingClientRect() : null;
                  
                  // Calculate the scale needed
                  const targetHeight = isMobile ? 24 : 31; // Mobile vs Desktop nav logo height
                  const currentHeight = heroRect.height;
                  const scaleFactor = targetHeight / currentHeight;
                  
                  // Calculate positions
                  let xDiff, yDiff;
                  
                  if (isMobile) {
                    // For mobile: target position is 20px from left, 40px from top of viewport
                    const targetX = 30;
                    const targetY = 40;
                    
                    // Since we'll be using fixed positioning, we need to calculate
                    // the difference from the current fixed position to the target
                    xDiff = targetX - heroRect.left;
                    yDiff = targetY - heroRect.top;
                  } else {
                    // For desktop: center to center of nav placeholder
                    const heroCenterX = heroRect.left + (heroRect.width / 2);
                    const heroCenterY = heroRect.top + (heroRect.height / 2);
                    const navCenterX = navRect ? navRect.left + (navRect.width / 2) : heroCenterX;
                    const navCenterY = navRect ? navRect.top + (navRect.height / 2) : heroCenterY;
                    
                    xDiff = navCenterX - heroCenterX;
                    yDiff = navCenterY - heroCenterY;
                  }
                  
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
                        const currentScale = 1 - (1 - scaleFactor) * progress;
                        
                        if (isMobile) {
                          // For mobile, we need to adjust for the top-left origin
                          gsap.set(heroLogo, {
                            x: xDiff * progress,
                            y: yDiff * progress,
                            scale: currentScale,
                            transformOrigin: "top left"
                          });
                        } else {
                          // For desktop, keep center origin
                          gsap.set(heroLogo, {
                            x: xDiff * progress,
                            y: yDiff * progress,
                            scale: currentScale,
                            transformOrigin: "center center"
                          });
                        }
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
      className="py-3 px-2 lg:p-6 mx-d mb-6 border rounded-xl fixed w-[calc(100vw-40px)]   lg:px-0 lg:w-[calc(100vw-80px)] z-50 top-4 mx-4"
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
              <svg className="nav-logo" width="242" height="31" viewBox="0 0 1462 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1311.56 128.369C1247.96 128.369 1224.32 104.731 1224.32 65.6148V62.7546C1224.32 23.6381 1247.96 0 1311.56 0C1375.15 0 1398.79 23.6381 1398.79 62.7546V65.6148C1398.79 104.731 1375.15 128.369 1311.56 128.369ZM1311.56 89.0006C1328.97 89.0006 1338.06 79.9154 1338.06 65.6148V62.7546C1338.06 48.454 1328.97 39.3689 1311.56 39.3689C1294.31 39.3689 1285.14 48.454 1285.14 62.7546V65.6148C1285.14 79.9154 1294.31 89.0006 1311.56 89.0006Z" fill="black"/>
                <path d="M1057.26 124.5V3.86959H1174.52C1202.87 3.86959 1217.68 18.5909 1217.68 41.8925V42.8178C1217.68 59.3898 1209.69 71.2509 1194.04 75.8776C1200.1 78.6536 1203.71 83.8692 1206.83 92.2813L1212.71 108.433C1215.83 116.929 1218.43 121.051 1222.22 123.659V124.5H1158.46C1156.44 121.471 1154.75 116.424 1153.07 109.526L1151.05 100.189C1149.37 93.5431 1145.67 90.5989 1138.77 90.5989H1116.06V124.5H1057.26ZM1146.26 62.2499C1154.33 62.2499 1158.88 57.7074 1158.88 51.1459V50.4729C1158.88 43.9114 1154.33 39.3689 1146.26 39.3689H1116.06V62.2499H1146.26Z" fill="black"/>
                <path d="M915.261 89.2529V55.7726H1047.58V89.2529H915.261Z" fill="black"/>
                <path d="M819.278 128.369C755.682 128.369 732.044 104.731 732.044 65.6148V62.7546C732.044 23.6381 755.682 0 819.278 0C882.874 0 906.512 23.6381 906.512 62.7546V65.6148C906.512 104.731 882.874 128.369 819.278 128.369ZM819.278 89.0006C836.691 89.0006 845.777 79.9154 845.777 65.6148V62.7546C845.777 48.454 836.691 39.3689 819.278 39.3689C802.033 39.3689 792.864 48.454 792.864 62.7546V65.6148C792.864 79.9154 802.033 89.0006 819.278 89.0006Z" fill="black"/>
                <path d="M665.083 124.5V3.86959H724.053V124.5H665.083Z" fill="black"/>
                <path d="M488.26 124.5V3.86959H590.047C636.23 3.86959 657.26 24.9 657.26 63.007V65.3624C657.26 103.469 636.23 124.5 590.047 124.5H488.26ZM574.148 85.9722C587.86 85.9722 596.356 77.4759 596.356 65.0259V63.3435C596.356 50.8935 587.86 42.3972 574.148 42.3972H547.229V85.9722H574.148Z" fill="black"/>
                <path d="M400.942 128.369C340.879 128.369 322.12 109.694 322.12 77.56V3.86959H381.005V73.8587C381.005 83.5327 386.725 89.2529 401.447 89.2529C415.832 89.2529 421.552 83.5327 421.552 73.8587V3.86959H478.586V77.56C478.586 109.694 459.911 128.369 400.942 128.369Z" fill="black"/>
                <path d="M210.491 124.5V43.8273H165.065V3.86959H314.802V43.8273H269.376V124.5H210.491Z" fill="black"/>
                <path d="M81.8691 128.369C18.1891 128.369 1.70131 112.134 0.944214 85.9722L60.5864 85.8881C61.6799 93.3749 66.3066 98.0016 83.7198 98.0016C100.712 98.0016 104.75 93.8796 104.75 88.8323V88.4117C104.75 84.3739 102.058 81.7661 95.1603 81.3455L44.5192 78.5695C14.7401 76.9712 2.62664 64.9418 2.62664 43.2385V41.9766C2.62664 16.8243 19.4509 0 81.3644 0C141.427 0 157.831 15.5625 158.924 40.3783H100.544C99.1981 34.4898 95.2444 30.3679 80.3549 30.3679C65.9701 30.3679 62.1006 34.2375 62.1006 39.2006V39.7054C62.1006 43.7432 64.7924 46.2668 71.2698 46.6033L120.986 49.3793C152.447 51.1459 164.476 63.0911 164.476 85.2151V86.3928C164.476 111.461 147.568 128.369 81.8691 128.369Z" fill="black"/>
                <path d="M1432.3 44.008C1411.93 44.008 1402.89 35.0701 1402.89 22.6096C1402.89 10.0702 1411.93 1.10604 1432.3 1.10604C1452.7 1.10604 1461.75 10.0702 1461.75 22.6096C1461.75 35.0701 1452.7 44.008 1432.3 44.008ZM1432.3 38.8819C1447.81 38.8819 1454.54 32.0733 1454.54 22.6096C1454.54 13.0408 1447.81 6.23219 1432.3 6.23219C1416.87 6.23219 1410.07 13.0408 1410.07 22.6096C1410.07 32.0733 1416.8 38.8819 1432.3 38.8819ZM1432.46 35.5433C1419 35.5433 1414.11 30.6011 1414.11 22.8199V22.2941C1414.11 14.5129 1419 9.57076 1432.41 9.57076C1445.26 9.57076 1449.76 13.9871 1450.02 20.9797H1436.69C1436.46 19.2185 1435.09 17.9829 1432.28 17.9829C1429.07 17.9829 1427.47 19.5865 1427.47 22.2416V22.741C1427.47 25.5013 1429.07 27.1048 1432.33 27.1048C1435.25 27.1048 1436.64 25.843 1436.85 23.9766H1450.26C1450.1 30.8377 1445.58 35.5433 1432.46 35.5433Z" fill="black"/>
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
      <div className="lg:hidden grid grid-cols-2 w-full">
        <div className="flex items-center">
          {!isHomePage && (
            <Link to="/" className="nav-title">
              <svg className="nav-logo" width="180" height="24" viewBox="0 0 1462 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1311.56 128.369C1247.96 128.369 1224.32 104.731 1224.32 65.6148V62.7546C1224.32 23.6381 1247.96 0 1311.56 0C1375.15 0 1398.79 23.6381 1398.79 62.7546V65.6148C1398.79 104.731 1375.15 128.369 1311.56 128.369ZM1311.56 89.0006C1328.97 89.0006 1338.06 79.9154 1338.06 65.6148V62.7546C1338.06 48.454 1328.97 39.3689 1311.56 39.3689C1294.31 39.3689 1285.14 48.454 1285.14 62.7546V65.6148C1285.14 79.9154 1294.31 89.0006 1311.56 89.0006Z" fill="black"/>
                <path d="M1057.26 124.5V3.86959H1174.52C1202.87 3.86959 1217.68 18.5909 1217.68 41.8925V42.8178C1217.68 59.3898 1209.69 71.2509 1194.04 75.8776C1200.1 78.6536 1203.71 83.8692 1206.83 92.2813L1212.71 108.433C1215.83 116.929 1218.43 121.051 1222.22 123.659V124.5H1158.46C1156.44 121.471 1154.75 116.424 1153.07 109.526L1151.05 100.189C1149.37 93.5431 1145.67 90.5989 1138.77 90.5989H1116.06V124.5H1057.26ZM1146.26 62.2499C1154.33 62.2499 1158.88 57.7074 1158.88 51.1459V50.4729C1158.88 43.9114 1154.33 39.3689 1146.26 39.3689H1116.06V62.2499H1146.26Z" fill="black"/>
                <path d="M915.261 89.2529V55.7726H1047.58V89.2529H915.261Z" fill="black"/>
                <path d="M819.278 128.369C755.682 128.369 732.044 104.731 732.044 65.6148V62.7546C732.044 23.6381 755.682 0 819.278 0C882.874 0 906.512 23.6381 906.512 62.7546V65.6148C906.512 104.731 882.874 128.369 819.278 128.369ZM819.278 89.0006C836.691 89.0006 845.777 79.9154 845.777 65.6148V62.7546C845.777 48.454 836.691 39.3689 819.278 39.3689C802.033 39.3689 792.864 48.454 792.864 62.7546V65.6148C792.864 79.9154 802.033 89.0006 819.278 89.0006Z" fill="black"/>
                <path d="M665.083 124.5V3.86959H724.053V124.5H665.083Z" fill="black"/>
                <path d="M488.26 124.5V3.86959H590.047C636.23 3.86959 657.26 24.9 657.26 63.007V65.3624C657.26 103.469 636.23 124.5 590.047 124.5H488.26ZM574.148 85.9722C587.86 85.9722 596.356 77.4759 596.356 65.0259V63.3435C596.356 50.8935 587.86 42.3972 574.148 42.3972H547.229V85.9722H574.148Z" fill="black"/>
                <path d="M400.942 128.369C340.879 128.369 322.12 109.694 322.12 77.56V3.86959H381.005V73.8587C381.005 83.5327 386.725 89.2529 401.447 89.2529C415.832 89.2529 421.552 83.5327 421.552 73.8587V3.86959H478.586V77.56C478.586 109.694 459.911 128.369 400.942 128.369Z" fill="black"/>
                <path d="M210.491 124.5V43.8273H165.065V3.86959H314.802V43.8273H269.376V124.5H210.491Z" fill="black"/>
                <path d="M81.8691 128.369C18.1891 128.369 1.70131 112.134 0.944214 85.9722L60.5864 85.8881C61.6799 93.3749 66.3066 98.0016 83.7198 98.0016C100.712 98.0016 104.75 93.8796 104.75 88.8323V88.4117C104.75 84.3739 102.058 81.7661 95.1603 81.3455L44.5192 78.5695C14.7401 76.9712 2.62664 64.9418 2.62664 43.2385V41.9766C2.62664 16.8243 19.4509 0 81.3644 0C141.427 0 157.831 15.5625 158.924 40.3783H100.544C99.1981 34.4898 95.2444 30.3679 80.3549 30.3679C65.9701 30.3679 62.1006 34.2375 62.1006 39.2006V39.7054C62.1006 43.7432 64.7924 46.2668 71.2698 46.6033L120.986 49.3793C152.447 51.1459 164.476 63.0911 164.476 85.2151V86.3928C164.476 111.461 147.568 128.369 81.8691 128.369Z" fill="black"/>
                <path d="M1432.3 44.008C1411.93 44.008 1402.89 35.0701 1402.89 22.6096C1402.89 10.0702 1411.93 1.10604 1432.3 1.10604C1452.7 1.10604 1461.75 10.0702 1461.75 22.6096C1461.75 35.0701 1452.7 44.008 1432.3 44.008ZM1432.3 38.8819C1447.81 38.8819 1454.54 32.0733 1454.54 22.6096C1454.54 13.0408 1447.81 6.23219 1432.3 6.23219C1416.87 6.23219 1410.07 13.0408 1410.07 22.6096C1410.07 32.0733 1416.8 38.8819 1432.3 38.8819ZM1432.46 35.5433C1419 35.5433 1414.11 30.6011 1414.11 22.8199V22.2941C1414.11 14.5129 1419 9.57076 1432.41 9.57076C1445.26 9.57076 1449.76 13.9871 1450.02 20.9797H1436.69C1436.46 19.2185 1435.09 17.9829 1432.28 17.9829C1429.07 17.9829 1427.47 19.5865 1427.47 22.2416V22.741C1427.47 25.5013 1429.07 27.1048 1432.33 27.1048C1435.25 27.1048 1436.64 25.843 1436.85 23.9766H1450.26C1450.1 30.8377 1445.58 35.5433 1432.46 35.5433Z" fill="black"/>
              </svg>
            </Link>
          )}
        </div>

        <div className="flex justify-end items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center px-3 py-2 relative"
          >
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 28 28" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-300"
            >
              <rect 
                x="1" 
                y="9" 
                width="25" 
                height="2" 
                fill="black"
                className={`transition-all duration-300 origin-center ${
                  isExpanded ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <rect 
                x="1" 
                y="17" 
                width="25" 
                height="2" 
                fill="black"
                className={`transition-all duration-300 origin-center ${
                  isExpanded ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ease-out ${
          isExpanded ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ backgroundColor: '#1c1c1c' }}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-6 pt-16">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white p-2"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8L24 24M24 8L8 24" stroke="white" strokeWidth="2"/>
              </svg>
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 flex flex-col justify-center px-8">
            {/* Studio Ro text */}

            
            <Link
              to="/about"
              className="text-6xl font-bold mb-8"
              style={{ color: '#FFFFFF' }}
              onClick={() => setIsExpanded(false)}
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className="text-6xl font-bold mb-12"
              style={{ color: '#FFFFFF' }}
              onClick={() => setIsExpanded(false)}
            >
              CONTACT
            </Link>
            <Link
              to="/book"
              className="bg-white text-black px-8 py-4 rounded-full inline-flex items-center gap-3 text-lg font-medium self-start"
              onClick={() => setIsExpanded(false)}
            >
              BOOK NOW
              <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5H15M15 1.5V15.5M15 1.5L1 15.5" stroke="#000000" strokeWidth="2"/>
              </svg>
            </Link>
            
            {/* Language Switcher */}
            <div className="mt-8 mb-24">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Bottom Section with Timezones and Stripes */}
          <div className="mt-auto">
            {/* Timezones */}
            {/* <div className="flex justify-between px-8 pb-8 text-sm" style={{ color: '#DFDFDF' }}>
              <div className="flex items-center gap-2  " style={{ color: '#DFDFDF' }}>
                <span className="text-white">LOS ANGELES</span>
                <Timezone timezone="America/Los_Angeles" showLabel={false} />
              </div>
              <div className="flex items-center gap-2 color-bg" style={{ color: '#DFDFDF' }}>
                <span className="text-white">VALENCIA</span>
                <Timezone className="text-white" timezone="Europe/Madrid" showLabel={false} />
              </div>
            </div> */}
            
            {/* Stripes */}
            <div className="w-full">
              <Stripes bgColor="#5e5e5e" className="mt-0 pb-0" inverted={true} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
