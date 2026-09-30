'use client';

import { clsx } from 'clsx';
import type { OfficialFilterOption } from '@/lib/official-console-data';

export interface FilterBarProps {
  state: string;
  sla: string;
  onStateChange: (value: string) => void;
  onSlaChange: (value: string) => void;
  stateOptions: OfficialFilterOption[];
  slaOptions: OfficialFilterOption[];
}

export function FilterBar({
  state,
  sla,
  onStateChange,
  onSlaChange,
  stateOptions,
  slaOptions,
}: FilterBarProps) {
  return (
    <div className="grid gap-4 rounded-lg border border-border bg-card p-4 lg:grid-cols-2">
      <fieldset>
        <legend className="text-sm font-medium text-foreground">Case state</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {stateOptions.map((option) => {
            const active = state === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onStateChange(option.value)}
                aria-pressed={active}
                className={clsx(
                  'inline-flex min-h-[44px] items-center rounded-full border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2',
                  active
                    ? 'border-accent bg-[#FFF9EC] text-foreground'
                    : 'border-border bg-background text-muted-foreground hover:bg-muted',
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-foreground">SLA state</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {slaOptions.map((option) => {
            const active = sla === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSlaChange(option.value)}
                aria-pressed={active}
                className={clsx(
                  'inline-flex min-h-[44px] items-center rounded-full border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2',
                  active
                    ? 'border-accent bg-[#FFF9EC] text-foreground'
                    : 'border-border bg-background text-muted-foreground hover:bg-muted',
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
