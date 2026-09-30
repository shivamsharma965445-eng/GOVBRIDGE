import type { ChangeEvent } from 'react';

export interface AuditFiltersProps {
  actor: string;
  action: string;
  resource: string;
  outcome: string;
  date: string;
  onActorChange: (value: string) => void;
  onActionChange: (value: string) => void;
  onResourceChange: (value: string) => void;
  onOutcomeChange: (value: string) => void;
  onDateChange: (value: string) => void;
  actorOptions: string[];
  actionOptions: string[];
  resourceOptions: string[];
  outcomeOptions: string[];
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm text-foreground">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        aria-label={label}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function AuditFilters({
  actor,
  action,
  resource,
  outcome,
  date,
  onActorChange,
  onActionChange,
  onResourceChange,
  onOutcomeChange,
  onDateChange,
  actorOptions,
  actionOptions,
  resourceOptions,
  outcomeOptions,
}: AuditFiltersProps) {
  return (
    <div className="grid gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-2 xl:grid-cols-5">
      <FilterSelect label="Actor" value={actor} options={actorOptions} onChange={onActorChange} />
      <FilterSelect label="Action" value={action} options={actionOptions} onChange={onActionChange} />
      <FilterSelect label="Resource" value={resource} options={resourceOptions} onChange={onResourceChange} />
      <FilterSelect label="Outcome" value={outcome} options={outcomeOptions} onChange={onOutcomeChange} />
      <label className="block text-sm text-foreground">
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Date
        </span>
        <input
          type="date"
          value={date}
          aria-label="Filter by date"
          onChange={(event: ChangeEvent<HTMLInputElement>) => onDateChange(event.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
        />
      </label>
    </div>
  );
}
