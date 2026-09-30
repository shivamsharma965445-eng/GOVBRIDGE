import { Card } from '@/components/ui/card';
import { CaseStatus } from './case-status';
import { type UnifiedCaseData } from '@/lib/case-data';

export interface CaseSummaryProps {
  caseData: UnifiedCaseData;
}

export function CaseSummary({ caseData }: CaseSummaryProps) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Unified case
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{caseData.serviceName}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            {caseData.summary}
          </p>
        </div>
        <div className="space-y-2 text-left sm:text-right">
          <CaseStatus status={caseData.currentStatus} />
          <p className="text-sm font-medium text-foreground">
            Current status: <span className="font-mono">{caseData.currentStatus}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Next action: <span className="text-foreground">{caseData.nextAction}</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
