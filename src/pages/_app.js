import "../styles/styles.css";
import Script from "next/script";


function MyApp({ Component, pageProps }) {
  return (
  <>
    <Script 
      strategy="afterInteractive" 
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
    <Script 
      strategy="afterInteractive" 
      src="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.js" />
    <Script
      strategy="afterInteractive"
      src="https://cdn.startbootstrap.com/sb-forms-latest.js"
    />
    <Component {...pageProps} />
  </>
  );
}

export default MyApp;
