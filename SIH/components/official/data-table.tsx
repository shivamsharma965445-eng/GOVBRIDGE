import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { SLAIndicator } from './sla-indicator';
import { StatusBadge } from './status-badge';
import { formatOfficialTimestamp, type OfficialCaseRow } from '@/lib/official-console-data';
import type { Route } from 'next';

export interface DataTableProps {
  rows: OfficialCaseRow[];
}

export function DataTable({ rows }: DataTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border" aria-label="Official case table">
          <thead className="bg-muted/40">
            <tr>
              {['Case ID', 'Service', 'Applicant', 'Current state', 'Owner', 'SLA', 'Last updated', 'Action'].map((column) => (
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
            {rows.map((row) => (
              <tr key={row.caseId} className="hover:bg-muted/30">
                <td className="px-4 py-4 font-mono text-sm text-foreground">{row.caseId}</td>
                <td className="px-4 py-4 text-sm text-foreground">{row.service}</td>
                <td className="px-4 py-4 text-sm text-foreground">{row.applicant}</td>
                <td className="px-4 py-4 text-sm text-foreground">
                  <StatusBadge status={row.currentState} label={row.currentState} />
                </td>
                <td className="px-4 py-4 text-sm text-foreground">{row.owner}</td>
                <td className="px-4 py-4 text-sm text-foreground">
                  <SLAIndicator status={row.sla} />
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {formatOfficialTimestamp(row.lastUpdated)}
                </td>
                <td className="px-4 py-4 text-sm text-foreground">
                  <Link
                    href={`/official/cases/${row.caseId}` as Route}
                    className="font-medium text-accent underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
