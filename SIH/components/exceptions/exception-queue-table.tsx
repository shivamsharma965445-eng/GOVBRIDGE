import Link from 'next/link';
import type { Route } from 'next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExceptionStatusBadge } from './exception-status-badge';
import { formatExceptionDate, type OfficialExceptionRow } from '@/lib/official-exceptions-data';

export interface ExceptionQueueTableProps {
  rows: OfficialExceptionRow[];
  activeExceptionId: string;
  onSelectException: (exceptionId: string) => void;
}

export function ExceptionQueueTable({ rows, activeExceptionId, onSelectException }: ExceptionQueueTableProps) {
  const toneClass = (state: OfficialExceptionRow['currentState']) => {
    if (state === 'Recovery') return 'border-[#D7E9D7] bg-[#F3FAF4] text-[#1F5B36]';
    if (state === 'Retry available' || state === 'Operator Review') return 'border-[#F2E7C5] bg-[#FCF6E8] text-[#7C5A12]';
    return 'border-border bg-muted text-muted-foreground';
  };

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border" aria-label="Official exceptions queue">
          <thead className="bg-muted/40">
            <tr>
              {['Exception ID', 'Case ID', 'Department', 'Operation', 'Current state', 'Occurred at', 'Retry count', 'Correlation ID', 'Assigned operator', 'Action'].map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {rows.map((row) => {
              const isActive = row.exceptionId === activeExceptionId;

              return (
                <tr key={row.exceptionId} className={isActive ? 'bg-[#FFF9EC]' : 'hover:bg-muted/30'}>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">{row.exceptionId}</td>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">{row.caseId}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{row.department}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{row.operation}</td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    <ExceptionStatusBadge status={row.currentState} />
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{formatExceptionDate(row.occurredAt)}</td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    <Badge className={toneClass(row.currentState)}>{row.retryCount}</Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">{row.correlationId}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{row.assignedOperator}</td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    <Link
                      href={'/official/exceptions' as Route}
                      onClick={() => onSelectException(row.exceptionId)}
                      className="font-medium text-accent underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
