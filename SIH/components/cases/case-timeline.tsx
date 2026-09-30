import { Card } from '@/components/ui/card';
import { formatUnifiedCaseDate, type CaseTimelineEvent, type UnifiedCaseStatus } from '@/lib/case-data';
import { CaseStatus } from './case-status';

export interface CaseTimelineProps {
  events: CaseTimelineEvent[];
  currentStatus: UnifiedCaseStatus;
}

export function CaseTimeline({ events, currentStatus }: CaseTimelineProps) {
  return (
    <ol className="space-y-4" aria-label="Case timeline">
      {events.map((event, index) => {
        const isCurrent = event.status === currentStatus;
        const isLast = index === events.length - 1;

        return (
          <li key={`${event.status}-${event.timestamp}`} className="relative pl-10">
            <span
              aria-hidden="true"
              className={
                isCurrent
                  ? 'absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-[#FFF9EC]'
                  : 'absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-border bg-background'
              }
            >
              <span
                className={
                  isCurrent ? 'h-2.5 w-2.5 rounded-full bg-accent' : 'h-2.5 w-2.5 rounded-full bg-muted-foreground'
                }
              />
            </span>
            {!isLast ? (
              <span aria-hidden="true" className="absolute left-[11px] top-7 h-[calc(100%-0.75rem)] w-px bg-border" />
            ) : null}

            <Card className={isCurrent ? 'border-accent/30 bg-[#FFF9EC] p-4 sm:p-5' : 'p-4 sm:p-5'}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-foreground">{event.title}</h3>
                    <CaseStatus status={event.status} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{event.description}</p>
                </div>
                <div className="text-sm leading-6 text-muted-foreground sm:text-right">
                  <p className="font-mono text-xs uppercase tracking-[0.14em]">Timestamp</p>
                  <p className="mt-1">{formatUnifiedCaseDate(event.timestamp)}</p>
                </div>
              </div>
              {event.sourceCategory ? (
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Source: {event.sourceCategory}
                </p>
              ) : null}
            </Card>
          </li>
        );
      })}
    </ol>
  );
}
