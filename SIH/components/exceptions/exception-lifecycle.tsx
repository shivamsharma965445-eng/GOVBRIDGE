import { Card } from '@/components/ui/card';
import { type OfficialExceptionRow } from '@/lib/official-exceptions-data';
import { ExceptionStatusBadge } from './exception-status-badge';

export interface ExceptionLifecycleProps {
  exception: OfficialExceptionRow;
}

export function ExceptionLifecycle({ exception }: ExceptionLifecycleProps) {
  return (
    <Card className="p-5 sm:p-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Lifecycle
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-foreground">Failure → Retry → Recovery or DLQ / Operator Review</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        The operational path shows what happened and what can happen next. It does not pretend that a failure is already recovered.
      </p>

      <ol className="mt-5 space-y-4">
        {exception.lifecycle.map((step, index) => (
          <li key={step.label} className="flex items-start gap-3">
            <div
              aria-hidden="true"
              className={step.completed ? 'mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#D7E9D7] bg-[#F3FAF4] text-[#1F5B36]' : 'mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground'}
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{step.label}</h3>
                <ExceptionStatusBadge status={step.completed ? (step.label === 'Recovery' ? 'Recovery' : 'Retry available') : 'Failure'} />
              </div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
