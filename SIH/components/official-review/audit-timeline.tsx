import { Card } from '@/components/ui/card';
import { formatReviewDate, type AuditEvent } from '@/lib/official-case-review-data';

export interface AuditTimelineProps {
  events: AuditEvent[];
}

export function AuditTimeline({ events }: AuditTimelineProps) {
  return (
    <ol className="space-y-4" aria-label="Audit history">
      {events.map((event, index) => {
        const isLast = index === events.length - 1;

        return (
          <li key={`${event.title}-${event.timestamp}`} className="relative pl-10">
            <span aria-hidden="true" className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-accent bg-[#FFF9EC]" />
            {!isLast ? <span aria-hidden="true" className="absolute left-[11px] top-7 h-[calc(100%-0.75rem)] w-px bg-border" /> : null}
            <Card className="p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{event.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{event.description}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Source: {event.source}
                  </p>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{formatReviewDate(event.timestamp)}</p>
              </div>
            </Card>
          </li>
        );
      })}
    </ol>
  );
}
