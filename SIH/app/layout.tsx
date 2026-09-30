import './globals.css';
import { IBM_Plex_Mono, Playfair_Display, Source_Sans_3 } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/lib/auth-context';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://govbridge.example'),
  title: {
    default: 'GovBridge',
    template: '%s | GovBridge',
  },
  description: 'GovBridge connects citizen services with accountable government operations and secure interoperability.',
  applicationName: 'GovBridge',
  keywords: ['government services', 'citizen portal', 'public service interoperability', 'accessibility'],
  authors: [{ name: 'GovBridge' }],
  creator: 'GovBridge',
  publisher: 'GovBridge',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'GovBridge',
    description: 'Citizen-first service journeys supported by secure, accountable government operations.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${sourceSans.variable} ${ibmPlexMono.variable} bg-background font-sans text-foreground antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
