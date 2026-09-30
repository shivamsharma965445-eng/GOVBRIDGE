import { Card } from '@/components/ui/card';
import { type GrievanceData } from '@/lib/grievance-data';
import { GrievanceStatus } from './grievance-status';

export interface GrievanceSummaryProps {
  grievance: GrievanceData;
}

export function GrievanceSummary({ grievance }: GrievanceSummaryProps) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Grievance record
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{grievance.grievanceId}</h2>
        </div>
        <GrievanceStatus status={grievance.status} />
      </div>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Case ID</dt>
          <dd className="mt-1 font-mono text-sm text-foreground">{grievance.caseId}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Created date</dt>
          <dd className="mt-1 text-sm text-foreground">
            {new Date(grievance.createdDate).toLocaleString('en-IN')}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Category</dt>
          <dd className="mt-1 text-sm text-foreground">{grievance.category}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Resolution</dt>
          <dd className="mt-1 text-sm text-foreground">{grievance.resolution}</dd>
        </div>
      </dl>
    </Card>
  );
}
