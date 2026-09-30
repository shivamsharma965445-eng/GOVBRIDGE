import * as React from 'react';
import { Card } from '@/components/ui/card';
import { ConsentStatus } from './consent-status';
import { type ConsentCaseData } from '@/lib/consent-data';

export interface ConsentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  consentCase: ConsentCaseData;
}

export function ConsentCard({ consentCase, children, ...props }: ConsentCardProps) {
  return (
    <Card className="p-5 sm:p-6" {...props}>
      <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Case
          </p>
          <p className="mt-1 font-mono text-lg font-semibold text-foreground">
            {consentCase.caseId}
          </p>
        </div>
        <ConsentStatus status={consentCase.status} />
      </div>

      <div className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <span className="min-w-[120px] font-medium text-foreground">Requester</span>
          <span>{consentCase.requester}</span>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <span className="min-w-[120px] font-medium text-foreground">Provider</span>
          <span>{consentCase.provider}</span>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <span className="min-w-[120px] font-medium text-foreground">Purpose</span>
          <span>{consentCase.purpose}</span>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <span className="min-w-[120px] font-medium text-foreground">Validity</span>
          <span>{consentCase.validityDays} days</span>
        </div>
      </div>

      <div className="mt-5">{children}</div>
    </Card>
  );
}
