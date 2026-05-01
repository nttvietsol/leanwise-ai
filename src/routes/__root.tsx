import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Nav } from '~/components/nav';
import { Footer } from '~/components/footer';

import '~/styles/system.css';
import '~/styles/shell.css';
import '~/styles/home.css';
import '~/styles/about.css';
import '~/styles/product.css';
import '~/styles/forms.css';
import '~/styles/blog.css';
import '~/styles/responsive.css';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'LeanWise AI — Lean Thinking. AI Speed. Real Results.' },
      {
        name: 'description',
        content:
          'AI-powered platform built to eliminate compliance waste, standardize processes, and give your manufacturing team clarity at every level.',
      },
      { property: 'og:title', content: 'LeanWise AI' },
      { property: 'og:description', content: 'Lean Thinking. AI Speed. Real Results.' },
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
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="app">
      <Nav />
      <Outlet />
      <Footer />
    </div>
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
