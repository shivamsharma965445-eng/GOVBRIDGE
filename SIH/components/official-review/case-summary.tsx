import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/official/status-badge';
import { type OfficialCaseSummaryData } from '@/lib/official-case-review-data';

export interface CaseSummaryProps {
  caseData: OfficialCaseSummaryData;
}

export function CaseSummary({ caseData }: CaseSummaryProps) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Case summary
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{caseData.caseId}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{caseData.overview}</p>
        </div>
        <div className="space-y-2 text-left sm:text-right">
          <StatusBadge status={caseData.currentState as never} label={caseData.currentState} />
          <p className="text-sm font-medium text-foreground">
            Current state: <span className="font-mono">{caseData.currentState}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Next action: <span className="text-foreground">{caseData.nextAction}</span>
          </p>
        </div>
      </div>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Service</dt>
          <dd className="mt-1 text-sm text-foreground">{caseData.serviceName}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Applicant</dt>
          <dd className="mt-1 text-sm text-foreground">{caseData.applicantName}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Owner</dt>
          <dd className="mt-1 text-sm text-foreground">{caseData.owner}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">SLA</dt>
          <dd className="mt-1 text-sm text-foreground">{caseData.sla}</dd>
        </div>
      </dl>
    </Card>
  );
}
