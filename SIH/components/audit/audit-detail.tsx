import type { AuditRecord } from '@/lib/audit-data';

const outcomeStyles: Record<string, string> = {
  Success: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  Warning: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Rejected: 'bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-200',
  Escalated: 'bg-violet-100 text-violet-800 ring-1 ring-inset ring-violet-200',
  'Needs review': 'bg-sky-100 text-sky-800 ring-1 ring-inset ring-sky-200',
};

export function AuditDetail({ record }: { record: AuditRecord | null }) {
  if (!record) {
    return (
      <aside aria-live="polite" className="rounded-lg border border-dashed border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        Select an audit record to view the operational context and correlation details.
      </aside>
    );
  }

  return (
    <aside aria-live="polite" className="rounded-lg border border-border bg-card p-5 sm:p-6" aria-label={`Audit record details for ${record.id}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Audit detail</p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">{record.id}</h3>
        </div>
        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${outcomeStyles[record.outcome]}`}>
          {record.outcome}
        </span>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-border bg-muted/30 p-3">
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Actor</dt>
          <dd className="mt-2 text-sm font-medium text-foreground">{record.actor}</dd>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-3">
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Action</dt>
          <dd className="mt-2 text-sm font-medium text-foreground">{record.action}</dd>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-3">
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Resource</dt>
          <dd className="mt-2 text-sm font-medium text-foreground">{record.resource}</dd>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-3">
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Purpose</dt>
          <dd className="mt-2 text-sm font-medium text-foreground">{record.purpose}</dd>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-3 sm:col-span-2">
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Policy / consent context</dt>
          <dd className="mt-2 text-sm leading-6 text-foreground">{record.policyContext}</dd>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-3">
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Timestamp</dt>
          <dd className="mt-2 text-sm font-mono text-foreground">{record.timestamp}</dd>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-3">
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Source</dt>
          <dd className="mt-2 text-sm font-medium text-foreground">{record.source}</dd>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-3 sm:col-span-2">
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Correlation ID</dt>
          <dd className="mt-2 text-sm font-mono text-foreground break-all">{record.correlationId}</dd>
        </div>
      </dl>
    </aside>
  );
}
