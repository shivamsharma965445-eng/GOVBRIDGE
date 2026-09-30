'use client';

import Link from 'next/link';
import * as React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { serviceCatalog } from '@/lib/services-data';

const popularServices = serviceCatalog.slice(0, 6);

const journeySteps = [
  'Discover',
  'Consent',
  'Connect',
  'Verify',
  'Track',
];

const systems = ['REST', 'SOAP/XML', 'CSV/SFTP', 'Database', 'Events'];

const trustPoints = [
  {
    title: 'Secure',
    description: 'Shared access is coordinated with clear consent and operational boundaries.',
  },
  {
    title: 'Consent-aware',
    description: 'Citizen action and authorisation remain visible throughout the service pathway.',
  },
  {
    title: 'Auditable',
    description: 'Status, decisions, and submissions are traceable for accountability and review.',
  },
  {
    title: 'Interoperable',
    description: 'GovBridge coordinates existing digital systems without replacing their own workflows.',
  },
];

export default function PublicLandingPage() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const matchingServices = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return serviceCatalog.filter((service) =>
      [service.name, service.description, service.category, service.department]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [searchQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={[
        { label: 'Services', href: '/services' },
        { label: 'My Applications', href: '/applications' },
        { label: 'Track Case', href: '/track' },
        { label: 'Help', href: '/support' },
      ]}
      secondaryActions={[
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Login', href: '/login' },
      ]}
      footerLinks={[
        { label: 'Services', href: '/services' },
        { label: 'My Applications', href: '/applications' },
        { label: 'Track Case', href: '/track' },
        { label: 'Help', href: '/support' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Privacy', href: '/privacy' },
      ]}
      footerNote="Public service access through a simpler, unified journey."
    >
      <section className="pt-4 sm:pt-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionLabel className="mb-4">Public service entry</SectionLabel>
            <PageHeader
              title="One journey. Connected government services."
              description="GovBridge connects existing government systems so citizens can access services through a simpler, unified journey."
              className="max-w-2xl"
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/services"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-accent bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                Explore Services
              </a>
              <a
                href="/track"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                Track an Application
              </a>
            </div>
          </div>

          <Card className="overflow-hidden border border-border bg-card p-0 shadow-soft">
            <div className="border-b border-border bg-muted px-5 py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Common steps
              </p>
            </div>
            <div className="space-y-4 p-5">
              {[
                'Check eligibility',
                'Submit documents',
                'Provide consent',
                'Track updates',
              ].map((item) => (
                <div key={item} className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-none last:pb-0">
                  <span className="text-base text-foreground">{item}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Step
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section aria-labelledby="service-search-heading" className="pt-8 sm:pt-12">
        <Card className="border border-border bg-card p-4 shadow-soft sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="lg:max-w-xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Service discovery
              </p>
              <h2 id="service-search-heading" className="mt-3 text-3xl text-foreground sm:text-4xl">
                What government service do you need?
              </h2>
            </div>

            <form className="w-full max-w-xl" aria-label="Service search form" onSubmit={handleSubmit}>
              <label htmlFor="service-search" className="sr-only">
                Search services
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="service-search"
                  type="search"
                  name="service-search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search services, schemes, certificates..."
                  aria-label="Search services, schemes, certificates"
                  className="min-h-[48px] flex-1 rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/80 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(141,105,25,0.18)] focus-visible:ring-offset-2"
                />
                <button
                  type="submit"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-accent bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(141,105,25,0.18)] focus-visible:ring-offset-2"
                >
                  Search
                </button>
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(141,105,25,0.18)] focus-visible:ring-offset-2"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          {searchQuery ? (
            <div className="mt-6" aria-live="polite">
              {matchingServices.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Showing {matchingServices.length} matching service{matchingServices.length === 1 ? '' : 's'} for “{searchQuery}”.
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {matchingServices.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="rounded-md border border-border bg-background p-3 text-left transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                      >
                        <div className="font-medium text-foreground">{service.name}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{service.department}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-dashed border-border bg-background p-5 text-sm text-muted-foreground">
                  No services match “{searchQuery}”. Try scholarship, certificate, verification, or grievance.
                </div>
              )}
            </div>
          ) : null}
        </Card>
      </section>

      <section aria-labelledby="popular-services-heading" className="pt-12 sm:pt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Popular services
            </p>
            <h2 id="popular-services-heading" className="mt-3 text-3xl text-foreground sm:text-4xl">
              Common citizen pathways
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {popularServices.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`} className="group block">
              <Card className="group h-full p-5 transition-colors hover:border-accent/40">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl text-foreground">{service.name}</h3>
                  <span aria-hidden="true" className="text-lg text-accent">→</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="journey-heading" className="pt-12 sm:pt-16">
        <div className="mb-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            The GovBridge journey
          </p>
          <h2 id="journey-heading" className="mt-3 text-3xl text-foreground sm:text-4xl">
            Discover the right path, then move with clarity.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {journeySteps.map((step, index) => (
            <div key={step} className="relative">
              <Card className="flex h-full min-h-[150px] flex-col justify-between p-5 text-left">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  0{index + 1}
                </p>
                <div>
                  <h3 className="text-2xl text-foreground">{step}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {index === 0 && 'Find the service and understand the path.'}
                    {index === 1 && 'Review permissions and share necessary details.'}
                    {index === 2 && 'Coordinate with existing government systems.'}
                    {index === 3 && 'Check eligibility, data, and validation.'}
                    {index === 4 && 'Follow the case and stay informed.'}
                  </p>
                </div>
              </Card>
              {index < journeySteps.length - 1 ? (
                <div aria-hidden="true" className="hidden justify-center py-2 text-accent xl:flex">
                  →
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="interoperability-heading" className="pt-12 sm:pt-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Interoperability
            </p>
            <h2 id="interoperability-heading" className="mt-3 text-3xl text-foreground sm:text-4xl">
              One entry point. Many systems behind it.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              GovBridge coordinates existing government systems so citizens experience one simplified service journey without losing the context of the underlying departments and workflows.
            </p>
          </div>

          <Card className="border border-border bg-muted p-5 sm:p-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                  Citizen
                </div>
              </div>

              <div className="flex justify-center text-accent" aria-hidden="true">
                ↓
              </div>

              <div className="flex justify-center">
                <div className="rounded-full border border-accent bg-white px-4 py-2 text-sm font-medium text-foreground shadow-soft">
                  GovBridge
                </div>
              </div>

              <div className="flex justify-center text-accent" aria-hidden="true">
                ↓
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Existing government systems
                </p>
                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {systems.map((system) => (
                    <div key={system} className="rounded-md border border-border bg-background px-3 py-2 text-center text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {system}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section aria-labelledby="case-heading" className="pt-12 sm:pt-16">
        <Card className="border border-border bg-card p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Unified case view
              </p>
              <h2 id="case-heading" className="mt-3 text-3xl text-foreground sm:text-4xl">
                One case. One timeline.
              </h2>
            </div>

            <div className="rounded-lg border border-border bg-muted p-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Case identifier
              </p>
              <p className="mt-3 font-mono text-xl text-foreground">GOV-2026-000184</p>
              <div className="mt-6 space-y-3">
                {[
                  'Submitted through citizen portal',
                  'Departmental review initiated',
                  'Document verification completed',
                  'Status update shared to citizen',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 border-b border-border pb-3 last:border-none last:pb-0">
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-sm leading-6 text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-6 text-muted-foreground">
                Departmental references remain behind the unified case experience while the citizen sees one clear timeline.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section aria-labelledby="trust-heading" className="pt-12 sm:pt-16">
        <div className="mb-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Build trust
          </p>
          <h2 id="trust-heading" className="mt-3 text-3xl text-foreground sm:text-4xl">
            A clearer journey for public service delivery.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustPoints.map((point) => (
            <Card key={point.title} className="p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">{point.title}</p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{point.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
