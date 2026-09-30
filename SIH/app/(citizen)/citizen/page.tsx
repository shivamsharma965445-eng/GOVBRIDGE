import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { SectionLabel } from '@/components/ui/section-label';

export default function CitizenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Citizen portal"
        title="Public services, designed to be understandable."
        description="Explore official services, track your applications, and access clear guidance from one trusted entry point."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <SectionLabel className="mb-4">Popular services</SectionLabel>
          <h2 className="text-2xl text-foreground">Utility and welfare</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Access government services with guidance that reduces friction and uncertainty.
          </p>
          <Link href="/services" className="mt-5 inline-flex min-h-[44px] items-center text-sm font-medium text-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2">
            View services
          </Link>
        </Card>

        <Card className="p-6">
          <SectionLabel className="mb-4">Applications</SectionLabel>
          <h2 className="text-2xl text-foreground">Track your status</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Review submitted applications, document status, and expected timelines.
          </p>
          <Link href="/dashboard" className="mt-5 inline-flex min-h-[44px] items-center text-sm font-medium text-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2">
            Open applications
          </Link>
        </Card>

        <Card className="p-6">
          <SectionLabel className="mb-4">Support</SectionLabel>
          <h2 className="text-2xl text-foreground">Help at every step</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Find plain-language guidance, FAQs, and contact support for critical submissions.
          </p>
          <Link href="/support" className="mt-5 inline-flex min-h-[44px] items-center text-sm font-medium text-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2">
            Get help
          </Link>
        </Card>
      </div>
    </>
  );
}
