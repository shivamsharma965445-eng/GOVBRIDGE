import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';

export default function SupportPage() {
  return (
    <Container className="py-10 sm:py-14">
      <PageHeader
        eyebrow="Support"
        title="Help with your application"
        description="Use this page for general support, status questions, and guidance on the scholarship journey."
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground">Need guidance?</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            The citizen experience keeps help plain and simple. If something is unclear, return to your dashboard or open the service catalog.
          </p>
          <Link href="/dashboard" className="mt-5 inline-flex min-h-[44px] items-center text-sm font-medium text-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2">
            Go to dashboard
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground">Service help</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            For the scholarship application, you can resume the form at any time from the saved draft in this browser session.
          </p>
          <Link href="/services" className="mt-5 inline-flex min-h-[44px] items-center text-sm font-medium text-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2">
            Browse services
          </Link>
        </Card>
      </div>
    </Container>
  );
}
