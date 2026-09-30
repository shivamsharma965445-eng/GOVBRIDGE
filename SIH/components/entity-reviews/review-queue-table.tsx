import Link from 'next/link';
import type { Route } from 'next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { entityReviewMatchTypeStyles, entityReviewStateStyles, type EntityReviewRow } from '@/lib/entity-review-data';

export interface ReviewQueueTableProps {
  rows: EntityReviewRow[];
  activeReviewId: string;
  onSelectReview: (reviewId: string) => void;
}

export function ReviewQueueTable({ rows, activeReviewId, onSelectReview }: ReviewQueueTableProps) {
  const badgeClass = (tone: 'active' | 'pending' | 'inactive') =>
    tone === 'active'
      ? 'border-[#D7E9D7] bg-[#F3FAF4] text-[#1F5B36]'
      : tone === 'pending'
        ? 'border-[#F2E7C5] bg-[#FCF6E8] text-[#7C5A12]'
        : 'border-border bg-muted text-muted-foreground';

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border" aria-label="Entity resolution review queue">
          <thead className="bg-muted/40">
            <tr>
              {['Review ID', 'Case ID', 'Match confidence', 'Match type', 'Evidence', 'Current state', 'Assigned reviewer'].map((column) => (
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
              const isActive = row.reviewId === activeReviewId;

              return (
                <tr key={row.reviewId} className={isActive ? 'bg-[#FFF9EC]' : 'hover:bg-muted/30'}>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">{row.reviewId}</td>
                  <td className="px-4 py-4 font-mono text-sm text-foreground">{row.caseId}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{row.confidence}%</td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    <Badge className={badgeClass(entityReviewMatchTypeStyles[row.matchType].tone)}>
                      {row.matchType}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">{row.evidence.length} items</td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    <Badge className={badgeClass(entityReviewStateStyles[row.currentState].tone)}>
                      {row.currentState}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-foreground">{row.assignedReviewer}</td>
                  <td className="px-4 py-4 text-sm text-foreground">
                    <Link
                      href={'/official/entity-reviews' as Route}
                      onClick={() => onSelectReview(row.reviewId)}
                      className="font-medium text-accent underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
                    >
                      Open
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
