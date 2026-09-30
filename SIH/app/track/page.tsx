'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { getTrackedCaseResult, readDemoState, type DemoCase } from '@/lib/demo-state';

const statusLabels: Record<string, string> = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  CONSENT_REQUIRED: 'Consent Required',
  CONSENT_GRANTED: 'Consent Granted',
  UNDER_REVIEW: 'Under Review',
  INFORMATION_REQUIRED: 'Information Required',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  COMPLETED: 'Completed',
  IDENTITY_VERIFIED: 'Identity Verified',
  DOCUMENTS_VALIDATED: 'Documents Validated',
  DEPARTMENT_REVIEW: 'Department Review',
  FIELD_VERIFICATION: 'Field Verification',
};

export default function TrackPage() {
  const router = useRouter();
  const [caseId, setCaseId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DemoCase | null>(null);
  const [knownCases, setKnownCases] = useState<string[]>([]);

  useEffect(() => {
    setKnownCases(readDemoState().applications.map((item) => item.caseId));
  }, []);

  const renderedResult = useMemo(() => {
    if (!result) return null;
    return (
      <Card className="mt-6 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Case found</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">{result.caseId}</h2>
            <p className="mt-2 text-base text-muted-foreground">{result.serviceName}</p>
          </div>
          <span className="inline-flex rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {statusLabels[result.workflowState || result.status] ?? result.status}
          </span>
        </div>
        <dl className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Department</dt>
            <dd className="mt-1 text-sm text-foreground">{result.department}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">SLA</dt>
            <dd className="mt-1 text-sm text-foreground">{result.slaStatus}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Next action</dt>
            <dd className="mt-1 text-sm text-foreground">{result.nextAction}</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push(`/cases/${result.caseId}`)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
          >
            View case detail
          </button>
          <Link
            href="/applications"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
          >
            View my applications
          </Link>
        </div>
      </Card>
    );
  }, [result, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanedCaseId = caseId.trim();

    if (!cleanedCaseId) {
      setError('Enter a case ID to continue.');
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    window.setTimeout(() => {
      const match = getTrackedCaseResult(cleanedCaseId);
      if (match) {
        setResult(match);
        router.push(`/cases/${match.caseId}`);
      } else {
        setResult(null);
        setError("We couldn't find a case with that ID.");
      }
      setIsLoading(false);
    }, 350);
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
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Track Case' },
      ]}
      footerLinks={[
        { label: 'Services', href: '/services' },
        { label: 'My Applications', href: '/applications' },
        { label: 'Track Case', href: '/track' },
        { label: 'Help', href: '/support' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Privacy', href: '/privacy' },
      ]}
      footerNote="Track service progress with clear updates, human checkpoints, and a single case view."
    >
      <Container className="py-8 sm:py-12">
        <PageHeader
          eyebrow="Track your application"
          title="Track your application"
          description="Enter your GovBridge case ID to see the latest status and next action."
          className="max-w-2xl"
        />

        <div className="mt-8 max-w-xl">
          <Card className="p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="case-id" className="mb-3 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  GovBridge case ID
                </label>
                <input
                  id="case-id"
                  name="case-id"
                  type="text"
                  value={caseId}
                  onChange={(event) => {
                    setCaseId(event.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="GOV-2026-000184"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'track-case-error' : undefined}
                  className="min-h-[48px] w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/80 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(141,105,25,0.18)] focus-visible:ring-offset-2"
                />
                {error ? (
                  <p id="track-case-error" className="mt-3 text-sm text-[#dc2626]" aria-live="polite">
                    {error}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-md border border-accent bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                {isLoading ? 'Checking case…' : 'Track case'}
              </button>
            </form>

            {knownCases.length > 0 ? (
              <div className="mt-5 border-t border-border pt-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Demo IDs</p>
                <p className="mt-2 text-sm text-muted-foreground">{knownCases.join(', ')}</p>
              </div>
            ) : null}

            <div className="mt-5 border-t border-border pt-5">
              <Link
                href="/applications"
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
              >
                View my applications
              </Link>
            </div>
          </Card>

          {result ? renderedResult : null}
        </div>
      </Container>
    </AppShell>
  );
}
