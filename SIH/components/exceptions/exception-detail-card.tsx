import { Card } from '@/components/ui/card';
import { ExceptionStatusBadge } from './exception-status-badge';
import { type OfficialExceptionRow } from '@/lib/official-exceptions-data';

export interface ExceptionDetailCardProps {
  exception: OfficialExceptionRow;
}

export function ExceptionDetailCard({ exception }: ExceptionDetailCardProps) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Exception details
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{exception.exceptionId}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{exception.summary}</p>
        </div>
        <ExceptionStatusBadge status={exception.currentState} />
      </div>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Case ID</dt>
          <dd className="mt-1 font-mono text-sm text-foreground">{exception.caseId}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Department</dt>
          <dd className="mt-1 text-sm text-foreground">{exception.department}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Operation</dt>
          <dd className="mt-1 text-sm text-foreground">{exception.operation}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Exception type</dt>
          <dd className="mt-1 text-sm text-foreground">{exception.exceptionType}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Occurred at</dt>
          <dd className="mt-1 font-mono text-sm text-foreground">{new Date(exception.occurredAt).toLocaleString('en-IN')}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Retry count</dt>
          <dd className="mt-1 font-mono text-sm text-foreground">{exception.retryCount}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Correlation ID</dt>
          <dd className="mt-1 font-mono text-sm text-foreground">{exception.correlationId}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Assigned operator</dt>
          <dd className="mt-1 text-sm text-foreground">{exception.assignedOperator}</dd>
        </div>
      </dl>

      <div className="mt-5 rounded-lg border border-border bg-muted/40 p-4">
        <p className="text-sm font-medium text-foreground">Recovery</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{exception.recovery}</p>
      </div>
    </Card>
  );
}
