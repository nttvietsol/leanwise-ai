import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useLocation,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Nav, StatusBar } from '~/components/nav';
import { Footer } from '~/components/footer';
import { useReveal } from '~/components/reveal';

import '~/styles/tokens.css';
import '~/styles/chrome.css';
import '~/styles/site.css';
import '~/styles/pages.css';
import '~/styles/resources.css';
import '~/styles/optimizations.css';
import '~/styles/admin.css';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'LeanWise AI — IKEA CONNECT compliance audits in minutes' },
      {
        name: 'description',
        content:
          'LeanWise AI automates IKEA CONNECT compliance verification — reading every test report and declaration and validating it against the live CONNECT TSS spec, with a confidence score on every line.',
      },
      { property: 'og:title', content: 'LeanWise AI' },
      {
        property: 'og:description',
        content: 'IKEA CONNECT compliance audits in 3 minutes, not 6 hours.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/assets/dashboard-preview.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: '/assets/logo-icon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@400;450;500;600;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
});

function RootLayout() {
  const { pathname } = useLocation();
  useReveal(pathname);
  // The admin console renders its own chrome — no marketing nav/footer.
  if (pathname.startsWith('/admin')) {
    return <Outlet />;
  }
  return (
    <>
      <StatusBar />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
