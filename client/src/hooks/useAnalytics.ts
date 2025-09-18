import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function useAnalytics(pageName: string) {
  useEffect(() => {
    if (!import.meta.env.VITE_GA_ID) return;
    if (!window.gtag) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${import.meta.env.VITE_GA_ID}');`;
      document.head.appendChild(script2);
    }
    window.gtag?.('event', 'page_view', { page_title: pageName });
  }, [pageName]);
}


