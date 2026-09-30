import Link from 'next/link';
import type { Route } from 'next';
import { Container } from '@/components/ui/container';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  links?: FooterLink[];
  note?: string;
}

export function Footer({ links = [], note = 'Government service experience foundation.' }: FooterProps) {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl leading-none tracking-[-0.05em] text-foreground">GovBridge</p>
          <p className="mt-2 text-sm text-muted-foreground">{note}</p>
        </div>

        {links.length > 0 ? (
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href as Route}
                className="min-h-[44px] rounded-md px-1 py-2 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </Container>
    </footer>
  );
}
