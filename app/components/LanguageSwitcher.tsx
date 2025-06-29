import { useLocale } from "~/contexts/LocaleContext";

export default function LanguageSwitcher() {
  const { locale: currentLocale, setLocale } = useLocale();

  const changeLocale = (locale: string) => {
    setLocale(locale);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => changeLocale("en")}
        className={`rounded-full h-7 w-7 flex items-center justify-center ${
          currentLocale === "en" ? "ring-2" : ""
        }`}
        style={currentLocale === "en" ? { boxShadow: `0 0 0 2px var(--tw-ring-color, #000)` } : {}}
      >
        <svg width="24" height="24" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_102_1138)">
            <path d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z" fill="#F0F0F0"/>
            <path d="M244.87 256H512C512 232.894 508.92 210.51 503.181 189.217H244.87V256Z" fill="#D80027"/>
            <path d="M244.87 122.435H474.426C458.755 96.8629 438.718 74.2599 415.356 55.6519H244.87V122.435Z" fill="#D80027"/>
            <path d="M256 512C316.249 512 371.626 491.176 415.356 456.348H96.644C140.374 491.176 195.751 512 256 512Z" fill="#D80027"/>
            <path d="M37.5738 389.565H474.426C487.007 369.036 496.764 346.596 503.181 322.782H8.81885C15.2358 346.596 24.9928 369.036 37.5738 389.565V389.565Z" fill="#D80027"/>
            <path d="M118.584 39.978H141.913L120.213 55.743L128.502 81.252L106.803 65.487L85.104 81.252L92.264 59.215C73.158 75.13 56.412 93.776 42.612 114.552H50.087L36.274 124.587C34.122 128.177 32.058 131.824 30.08 135.525L36.676 155.826L24.37 146.885C21.311 153.366 18.513 159.993 15.998 166.758L23.265 189.126H50.087L28.387 204.891L36.676 230.4L14.977 214.635L1.979 224.079C0.678 234.537 0 245.189 0 256H256C256 114.616 256 97.948 256 0C205.428 0 158.285 14.67 118.584 39.978V39.978ZM128.502 230.4L106.803 214.635L85.104 230.4L93.393 204.891L71.693 189.126H98.515L106.803 163.617L115.091 189.126H141.913L120.213 204.891L128.502 230.4ZM120.213 130.317L128.502 155.826L106.803 140.061L85.104 155.826L93.393 130.317L71.693 114.552H98.515L106.803 89.043L115.091 114.552H141.913L120.213 130.317ZM220.328 230.4L198.629 214.635L176.93 230.4L185.219 204.891L163.519 189.126H190.341L198.629 163.617L206.917 189.126H233.739L212.039 204.891L220.328 230.4ZM212.039 130.317L220.328 155.826L198.629 140.061L176.93 155.826L185.219 130.317L163.519 114.552H190.341L198.629 89.043L206.917 114.552H233.739L212.039 130.317ZM212.039 55.743L220.328 81.252L198.629 65.487L176.93 81.252L185.219 55.743L163.519 39.978H190.341L198.629 14.469L206.917 39.978H233.739L212.039 55.743Z" fill="#0052B4"/>
          </g>
          <defs>
            <clipPath id="clip0_102_1138">
              <rect width="512" height="512" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </button>

      <button
        onClick={() => changeLocale("es")}
        className={`rounded-full h-7 w-7 flex items-center justify-center ${
          currentLocale === "es" ? "ring-2" : ""
        }`}
        style={currentLocale === "es" ? { boxShadow: `0 0 0 2px var(--tw-ring-color, #000)` } : {}}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_103_1185)">
            <path d="M0 12.0001C0 13.4679 0.264047 14.874 0.746391 16.174L12 17.2175L23.2536 16.174C23.736 14.874 24 13.4679 24 12.0001C24 10.5322 23.736 9.12618 23.2536 7.8262L12 6.78271L0.746391 7.8262C0.264047 9.12618 0 10.5322 0 12.0001H0Z" fill="#FFDA44"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.84577 11.2105V13.7706C8.84577 14.4817 8.17527 15.0506 7.34912 15.0506H5.35359C4.52943 15.0486 3.85693 14.4766 3.85693 13.7685V11.2085C3.85693 10.6274 4.30393 10.1417 4.91856 9.98428C5.10414 9.45601 5.67487 9.92942 6.35135 9.92942C7.03183 9.92942 7.59856 9.45906 7.78415 9.9853C8.39678 10.1468 8.84577 10.6334 8.84577 11.2105Z" fill="#D4AF2C"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.84598 12.001H9.84375V15.0487H8.84598V12.001ZM2.85938 12.001H3.85714V15.0487H2.85938V12.001Z" fill="#CBCBCB"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.84598 14.0327H9.84375V15.0486H8.84598V14.0327ZM2.85938 14.0327H3.85714V15.0486H2.85938V14.0327Z" fill="#1A47B8"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.84598 10.9849H9.84375V12.0008H8.84598V10.9849ZM2.85938 10.9849H3.85714V12.0008H2.85938V10.9849Z" fill="#D4AF2C"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.85498 10.9849H5.85275V12.5087H4.85498V10.9849ZM6.85052 13.0167H7.84828V14.5405H6.85052V13.0167Z" fill="#AF010D"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6.85059 10.9849H7.84835V12.5087H6.85059V10.9849Z" fill="#AE6A3E"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.85498 13.0166H5.85275V14.5405H4.85498V13.0166Z" fill="#FFDA2C"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M5.85275 10.9851L4.85498 9.96924H7.84828L6.85052 10.9851H5.85275Z" fill="#AF010D"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M5.85254 8.95312H6.85031V9.96903H5.85254V8.95312Z" fill="#D4AF2C"/>
            <path d="M23.2538 7.82611C21.5583 3.25655 17.1598 0 12.0002 0C6.84061 0 2.4421 3.25655 0.746582 7.82611H23.2538Z" fill="#D80027"/>
            <path d="M0.746582 16.1738C2.4421 20.7434 6.84061 23.9999 12.0002 23.9999C17.1598 23.9999 21.5583 20.7434 23.2538 16.1738H0.746582Z" fill="#D80027"/>
          </g>
          <defs>
            <clipPath id="clip0_103_1185">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}
