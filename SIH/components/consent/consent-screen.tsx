'use client';

import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Divider } from '@/components/ui/divider';
import { AppShell } from '@/components/layout/app-shell';
import { ConsentCard } from './consent-card';
import { ConsentReceipt } from './consent-receipt';
import { ConsentSummary } from './consent-summary';
import { DataAttributeList } from './data-attribute-list';
import {
  buildConsentReceipt,
  consentApi,
  type ConsentCaseData,
  type ConsentReceiptData,
  type ConsentStatus,
} from '@/lib/consent-data';
import { readDemoState, updateApplicationState } from '@/lib/demo-state';

const consentNavItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Services', href: '/services' },
  { label: 'Applications', href: '/applications' },
  { label: 'Support', href: '/support' },
];

const consentFooterLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Support', href: '/support' },
];

interface ConsentScreenProps {
  caseId: string;
  initialStatus?: ConsentStatus;
}

const mapStoredConsentState = (value?: string): ConsentStatus | undefined => {
  switch (value) {
    case 'Approved':
      return 'Approved';
    case 'Denied':
      return 'Denied';
    case 'Pending':
      return 'Pending';
    default:
      return undefined;
  }
};

const statusToDisplay = (status: ConsentStatus): string => {
  if (status === 'Pending') return 'Awaiting your decision';
  if (status === 'Approved') return 'Consent approved';
  if (status === 'Denied') return 'Consent denied';
  if (status === 'Expired') return 'Consent expired';
  return 'Consent revoked';
};

const persistConsentDecision = (caseId: string, status: ConsentStatus, timestamp: string) => {
  const currentCase = readDemoState().applications.find((item) => item.caseId === caseId);

  if (!currentCase) {
    return;
  }

  const nextStatusMap: Record<ConsentStatus, string> = {
    Pending: 'CONSENT_REQUIRED',
    Approved: 'CONSENT_GRANTED',
    Denied: 'INFORMATION_REQUIRED',
    Expired: 'CONSENT_REQUIRED',
    Revoked: 'CONSENT_REQUIRED',
  };

  const nextWorkflowStateMap: Record<ConsentStatus, string> = {
    Pending: 'CONSENT_REQUIRED',
    Approved: 'CONSENT_GRANTED',
    Denied: 'INFORMATION_REQUIRED',
    Expired: 'CONSENT_REQUIRED',
    Revoked: 'CONSENT_REQUIRED',
  };

  const actionTextMap: Record<ConsentStatus, string> = {
    Pending: 'Awaiting citizen consent for income verification',
    Approved: 'Income verification approved and department review resumed',
    Denied: 'Citizen denied consent for income verification',
    Expired: 'Consent expired and a new request is required',
    Revoked: 'Consent was revoked and a fresh approval is required',
  };

  const consentStateMap: Record<ConsentStatus, 'Pending' | 'Approved' | 'Denied'> = {
    Pending: 'Pending',
    Approved: 'Approved',
    Denied: 'Denied',
    Expired: 'Denied',
    Revoked: 'Denied',
  };

  updateApplicationState(
    caseId,
    {
      status: nextStatusMap[status] as typeof currentCase.status,
      workflowState: nextWorkflowStateMap[status] as typeof currentCase.workflowState,
      consentState: consentStateMap[status],
      nextAction: actionTextMap[status],
      lastUpdated: timestamp,
    },
    {
      addTimelineEvent: {
        id: `evt-consent-${Date.now()}`,
        title:
          status === 'Approved'
            ? 'Consent approved'
            : status === 'Denied'
              ? 'Consent denied'
              : 'Consent revoked',
        description:
          status === 'Approved'
            ? 'The citizen approved the request for income eligibility data sharing.'
            : status === 'Denied'
              ? 'The citizen denied the consent request. A fresh request is required before department review can continue.'
              : 'The citizen revoked a previous consent decision. The data-sharing permission is no longer active.',
        timestamp,
        status: status === 'Approved' ? 'CONSENT_GRANTED' : 'CONSENT_REQUIRED',
        source: 'Citizen consent',
      },
    },
  );
};

export function ConsentScreen({ caseId, initialStatus = 'Pending' }: ConsentScreenProps) {
  const [consentCase, setConsentCase] = React.useState<ConsentCaseData | null>(null);
  const [status, setStatus] = React.useState<ConsentStatus>(initialStatus);
  const [receipt, setReceipt] = React.useState<ConsentReceiptData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showReason, setShowReason] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const loadedCase = await consentApi.loadCase(caseId);
        const currentDemoCase = readDemoState().applications.find((item) => item.caseId === caseId);
        const persistedStatus = mapStoredConsentState(currentDemoCase?.consentState) ?? initialStatus;

        if (!isMounted) return;

        setConsentCase({
          ...loadedCase,
          status: persistedStatus,
        });
        setStatus(persistedStatus);
        setError(null);

        if (persistedStatus === 'Approved' || persistedStatus === 'Revoked') {
          const action = persistedStatus === 'Approved' ? 'approve' : 'revoke';
          setReceipt(buildConsentReceipt(loadedCase, action, new Date().toISOString()));
        } else {
          setReceipt(null);
        }
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : 'Unable to load consent case.');
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [caseId, initialStatus]);

  const handleDecision = async (action: 'approve' | 'deny') => {
    if (!consentCase) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await consentApi.submitDecision({
        caseId: consentCase.caseId,
        action,
        timestamp: new Date().toISOString(),
      });

      const nextStatus = response.status;
      const timestamp = new Date().toISOString();

      persistConsentDecision(consentCase.caseId, nextStatus, timestamp);
      setStatus(nextStatus);
      setConsentCase((current) => (current ? { ...current, status: nextStatus } : current));
      setReceipt(response.receipt ?? null);
    } catch (decisionError) {
      setError(decisionError instanceof Error ? decisionError.message : 'Unable to save consent decision.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevoke = async () => {
    if (!consentCase || status !== 'Approved') return;

    setIsSubmitting(true);
    setError(null);

    try {
      const timestamp = new Date().toISOString();
      const response = await consentApi.submitDecision({
        caseId: consentCase.caseId,
        action: 'revoke',
        timestamp,
      });

      persistConsentDecision(consentCase.caseId, response.status, timestamp);
      setStatus(response.status);
      setConsentCase((current) => (current ? { ...current, status: response.status } : current));
      setReceipt(response.receipt ?? null);
    } catch (decisionError) {
      setError(decisionError instanceof Error ? decisionError.message : 'Unable to revoke consent.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell
      brand="GOVBRIDGE"
      navItems={consentNavItems}
      mobileNavItems={consentNavItems}
      secondaryActions={[{ label: 'Back to dashboard', href: '/dashboard' }]}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Applications', href: '/applications' },
        { label: 'Consent' },
      ]}
      footerLinks={consentFooterLinks}
      footerNote="Consent is expressed in clear language, with no raw payload exposure."
    >
      <Container className="py-8 sm:py-12">
        <div className="space-y-8">
          <PageHeader
            eyebrow="Consent"
            title="Review and decide on this data sharing request"
            description="This screen explains exactly who is asking, who provides the data, and why it is needed before you make a choice."
          />

          {error ? (
            <Card className="border-[#F5D7D7] bg-[#FFFBFB] p-5 text-sm leading-6 text-[#8B3A3A]">
              {error}
            </Card>
          ) : null}

          {!consentCase && !error ? (
            <Card className="p-6 text-sm leading-6 text-muted-foreground">
              Loading consent details…
            </Card>
          ) : null}

          {consentCase ? (
            <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
              <div className="space-y-6">
                <ConsentCard consentCase={consentCase}>
                  <ConsentSummary consentCase={consentCase} />

                  <div className="mt-5 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Which attributes are requested?</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Only the minimum information needed for scholarship eligibility verification is requested.
                      </p>
                    </div>
                    <DataAttributeList attributes={consentCase.attributes} />
                  </div>

                  <Divider className="my-6" />

                  <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
                    <button
                      type="button"
                      className="text-left text-sm font-medium text-accent underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                      onClick={() => setShowReason((current) => !current)}
                      aria-expanded={showReason}
                      aria-controls="consent-reason-panel"
                    >
                      Learn why this information is required
                    </button>
                    {showReason ? (
                      <div id="consent-reason-panel" className="space-y-3 text-sm leading-6 text-muted-foreground">
                        <p>{consentCase.privacyExplanation}</p>
                        <ul className="space-y-2 pl-5">
                          {consentCase.summaryNotes.map((note) => (
                            <li key={note} className="list-disc">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  <Divider className="my-6" />

                  {status === 'Pending' ? (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button onClick={() => void handleDecision('approve')} disabled={isSubmitting}>
                        Approve data sharing
                      </Button>
                      <Button variant="secondary" onClick={() => void handleDecision('deny')} disabled={isSubmitting}>
                        Deny request
                      </Button>
                    </div>
                  ) : null}

                  {status === 'Approved' ? (
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button onClick={() => void handleRevoke()} disabled={isSubmitting}>
                        Revoke consent
                      </Button>
                      <Link
                        href="/dashboard"
                        className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                      >
                        Return to dashboard
                      </Link>
                    </div>
                  ) : null}

                  {status === 'Denied' ? (
                    <Card className="border-[#F2E7C5] bg-[#FCF6E8] p-4 text-sm leading-6 text-[#7C5A12]">
                      You denied this request. No data sharing will take place for this case.
                    </Card>
                  ) : null}

                  {status === 'Expired' ? (
                    <Card className="border-[#F2E7C5] bg-[#FCF6E8] p-4 text-sm leading-6 text-[#7C5A12]">
                      This consent request has expired. A fresh request is required to continue.
                    </Card>
                  ) : null}

                  {status === 'Revoked' ? (
                    <Card className="border-[#F5D7D7] bg-[#FFFBFB] p-4 text-sm leading-6 text-[#8B3A3A]">
                      You revoked this consent. The permission is no longer active.
                    </Card>
                  ) : null}
                </ConsentCard>
              </div>

              <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
                <Card className="p-5 sm:p-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Consent status
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">
                    {statusToDisplay(status)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Case {consentCase.caseId} is handled as a demo consent request only. No backend enforcement is performed here.
                  </p>
                </Card>

                {receipt && status === 'Approved' ? <ConsentReceipt receipt={receipt} /> : null}
                {receipt && status === 'Revoked' ? <ConsentReceipt receipt={receipt} /> : null}
              </aside>
            </div>
          ) : null}
        </div>
      </Container>
    </AppShell>
  );
}
