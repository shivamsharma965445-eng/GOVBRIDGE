import { Card } from '@/components/ui/card';
import { ConsentStatus } from './consent-status';
import { type ConsentCaseData } from '@/lib/consent-data';

export interface ConsentSummaryProps {
  consentCase: ConsentCaseData;
}

export function ConsentSummary({ consentCase }: ConsentSummaryProps) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Consent request
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            What is being requested
          </h2>
        </div>
        <ConsentStatus status={consentCase.status} />
      </div>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Who is requesting data?</dt>
          <dd className="mt-1 text-sm leading-6 text-foreground">{consentCase.requester}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Who provides the data?</dt>
          <dd className="mt-1 text-sm leading-6 text-foreground">{consentCase.provider}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Why is it needed?</dt>
          <dd className="mt-1 text-sm leading-6 text-foreground">{consentCase.purpose}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Which case does it belong to?</dt>
          <dd className="mt-1 font-mono text-sm leading-6 text-foreground">{consentCase.caseId}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">How long is permission valid?</dt>
          <dd className="mt-1 text-sm leading-6 text-foreground">{consentCase.validityDays} days</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Requested information</dt>
          <dd className="mt-1 text-sm leading-6 text-foreground">{consentCase.requestedInformation}</dd>
        </div>
      </dl>
    </Card>
  );
}
