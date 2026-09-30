'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Divider } from '@/components/ui/divider';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';
import { serviceCatalog } from '@/lib/services-data';
import { useAuth } from '@/lib/auth-context';

function StartApplicationLink() {
  const { isAuthenticated, user } = useAuth();
  const href = isAuthenticated && user?.role === 'citizen' ? '/apply/scholarship' : '/login';

  return (
    <Link
      href={href}
      className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-accent bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
    >
      Start application
    </Link>
  );
}

const serviceDetails: Record<string, { longDescription: string; infoRequired: string[]; govBridgeRequests: string[]; departments: { name: string; role: string }[]; journeySteps: { title: string; description: string }[]; privacyPoints: string[] }> = {
  'scholarship-welfare': {
    longDescription:
      'A demonstration cross-department service journey showing how GovBridge coordinates identity verification, citizen consent, and departmental workflows to simplify access to government welfare and educational support schemes.',
    infoRequired: [
      'Full name and date of birth',
      'Government ID (Aadhaar, PAN, or Voter ID)',
      'Current address and contact information',
      'Educational background and institution details',
      'Income and financial details (if applicable)',
      'Family member information (in some schemes)',
    ],
    govBridgeRequests: [
      'Verify identity with the ID authority',
      'Confirm current address with postal records',
      'Check income information with the tax/revenue department',
      'Validate educational credentials with the education department',
      'Check eligibility against welfare scheme criteria',
      'Coordinate approval across participating departments',
    ],
    departments: [
      {
        name: 'Department of Education',
        role: 'Validates educational credentials and institutional status',
      },
      {
        name: 'Revenue Department',
        role: 'Provides income verification and eligibility confirmation',
      },
      {
        name: 'Social Welfare Department',
        role: 'Manages scheme eligibility and benefit disbursement',
      },
      {
        name: 'ID Authority',
        role: 'Verifies citizen identity and status',
      },
    ],
    journeySteps: [
      { title: 'Start', description: 'You provide basic information and select a scheme.' },
      { title: 'Consent', description: 'You authorize GovBridge to share information across departments.' },
      { title: 'Verification', description: 'Your identity and eligibility are verified in real time.' },
      { title: 'Review', description: 'Departmental officers review your application.' },
      { title: 'Decision', description: 'Eligibility determination is made and communicated.' },
      { title: 'Payment', description: 'Benefits are arranged for disbursement.' },
      { title: 'Completion', description: 'You can track and manage your benefits.' },
    ],
    privacyPoints: [
      'You control what information is shared. No data moves without your explicit consent.',
      'Each department can only access information relevant to their decision.',
      'All data requests and sharing are logged and auditable.',
      'You can withdraw consent at any time, which stops future data sharing.',
      'Your personal data is encrypted and protected under government data security standards.',
    ],
  },
};

export default function ServiceDetailPage({ params }: { params: { serviceId: string } }) {
  const service = serviceCatalog.find((entry) => entry.id === params.serviceId);
  const details = serviceDetails[params.serviceId];

  if (!service || !details) {
    notFound();
  }

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
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: service.name },
      ]}
      footerLinks={[
        { label: 'Services', href: '/services' },
        { label: 'My Applications', href: '/applications' },
        { label: 'Track Case', href: '/track' },
        { label: 'Help', href: '/support' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Privacy', href: '/privacy' },
      ]}
      footerNote="Demonstration service details."
    >
      <section className="pt-4 sm:pt-8">
        <PageHeader
          eyebrow={service.category}
          title={service.name}
          description={details.longDescription}
          className="max-w-3xl"
        />
      </section>

      <section aria-labelledby="overview-heading" className="pt-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-6">
            <h2 id="overview-heading" className="text-2xl text-foreground">
              Service overview
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                <dt className="font-medium uppercase tracking-[0.14em] text-muted-foreground">Department</dt>
                <dd className="text-right text-foreground">{service.department}</dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                <dt className="font-medium uppercase tracking-[0.14em] text-muted-foreground">Status</dt>
                <dd className="text-right text-foreground">{service.availability}</dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                <dt className="font-medium uppercase tracking-[0.14em] text-muted-foreground">Complexity</dt>
                <dd className="text-right text-foreground">{service.complexity}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="font-medium uppercase tracking-[0.14em] text-muted-foreground">Demand</dt>
                <dd className="text-right text-foreground">{service.popularity}% commonly accessed</dd>
              </div>
            </dl>
          </Card>

          <Card className="flex flex-col justify-between p-6">
            <div>
              <SectionLabel className="mb-4">Ready to begin?</SectionLabel>
              <p className="text-base leading-7 text-muted-foreground">
                The application takes approximately 10-15 minutes and requires basic personal and educational information.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <StartApplicationLink />
              <Link
                href="/services"
                className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                Back to services
              </Link>
              </div>
          </Card>
        </div>
      </section>

      <Divider className="my-12" />

      <section aria-labelledby="info-required-heading" className="pt-8">
        <SectionLabel className="mb-4">Information & documentation</SectionLabel>
        <h2 id="info-required-heading" className="text-3xl text-foreground">
          What information is required
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {details.infoRequired.map((item) => (
            <Card key={item} className="p-4">
              <p className="flex items-start gap-3 text-base leading-6 text-foreground">
                <span aria-hidden="true" className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                {item}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <Divider className="my-12" />

      <section aria-labelledby="govbridge-heading" className="pt-8">
        <SectionLabel className="mb-4">Data coordination</SectionLabel>
        <h2 id="govbridge-heading" className="text-3xl text-foreground">
          What GovBridge will request on your behalf
        </h2>

        <div className="mt-6 space-y-4">
          {details.govBridgeRequests.map((item) => (
            <Card key={item} className="border-l-2 border-l-accent p-4">
              <p className="text-base leading-6 text-foreground">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <Divider className="my-12" />

      <section aria-labelledby="departments-heading" className="pt-8">
        <SectionLabel className="mb-4">Government partners</SectionLabel>
        <h2 id="departments-heading" className="text-3xl text-foreground">
          Departments and systems involved
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {details.departments.map((dept) => (
            <Card key={dept.name} className="p-5">
              <h3 className="text-lg font-medium text-foreground">{dept.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{dept.role}</p>
            </Card>
          ))}
        </div>
      </section>

      <Divider className="my-12" />

      <section aria-labelledby="journey-heading" className="pt-8">
        <SectionLabel className="mb-4">Your journey</SectionLabel>
        <h2 id="journey-heading" className="text-3xl text-foreground">
          Expected journey and timeline
        </h2>

        <div className="mt-6 space-y-3">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {details.journeySteps.map((step, index) => (
              <div key={step.title} className="relative">
                <Card className="flex h-full min-h-[160px] flex-col justify-between p-4">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-3 text-lg text-foreground">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-5 text-muted-foreground">{step.description}</p>
                </Card>
                {index < details.journeySteps.length - 1 ? (
                  <div aria-hidden="true" className="hidden justify-center pt-2 text-accent md:flex">
                    →
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider className="my-12" />

      <section aria-labelledby="privacy-heading" className="pt-8">
        <SectionLabel className="mb-4">Your privacy and rights</SectionLabel>
        <h2 id="privacy-heading" className="text-3xl text-foreground">
          How your information is protected
        </h2>

        <div className="mt-6 space-y-4">
          {details.privacyPoints.map((point) => (
            <Card key={point} className="bg-muted p-5">
              <p className="text-base leading-7 text-foreground">{point}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6 border-l-4 border-l-accent bg-background p-5">
          <p className="text-sm leading-6 text-muted-foreground">
            <strong className="text-foreground">Questions about your data?</strong> You have the right to request what information has been
            collected and how it&apos;s been used. Contact the{' '}
            <Link href="/support" className="text-accent underline hover:no-underline">
              Public Grievance Cell
            </Link>{' '}
            for data access requests.
          </p>
        </Card>
      </section>

      <Divider className="my-12" />

      <section className="flex flex-col items-center gap-6 rounded-lg border border-border bg-muted p-8 text-center sm:p-10">
        <div>
          <h2 className="text-2xl text-foreground sm:text-3xl">Ready to start?</h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            You&apos;ll be able to review all information before sharing anything. Your consent is required at every step.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <StartApplicationLink />
          <Link
            href="/services"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
          >
            Back to services
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
