import type { AuditRecord } from '@/lib/audit-data';

const outcomeStyles: Record<string, string> = {
  Success: 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200',
  Warning: 'bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200',
  Rejected: 'bg-rose-100 text-rose-800 ring-1 ring-inset ring-rose-200',
  Escalated: 'bg-violet-100 text-violet-800 ring-1 ring-inset ring-violet-200',
  'Needs review': 'bg-sky-100 text-sky-800 ring-1 ring-inset ring-sky-200',
};

export interface AuditTableProps {
  records: AuditRecord[];
  selectedId: string | null;
  onSelect: (record: AuditRecord) => void;
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function AuditTable({
  records,
  selectedId,
  onSelect,
  pageSize,
  currentPage,
  totalRecords,
  onNextPage,
  onPreviousPage,
}: AuditTableProps) {
  const startIndex = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalRecords);

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="text-sm font-medium text-foreground">Audit queue</p>
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Showing {startIndex}-{endIndex} of {totalRecords}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-muted-foreground">
              <th scope="col" className="px-4 py-3 font-medium">Actor</th>
              <th scope="col" className="px-4 py-3 font-medium">Action</th>
              <th scope="col" className="px-4 py-3 font-medium">Resource</th>
              <th scope="col" className="px-4 py-3 font-medium">Purpose</th>
              <th scope="col" className="px-4 py-3 font-medium">Timestamp</th>
              <th scope="col" className="px-4 py-3 font-medium">Outcome</th>
              <th scope="col" className="px-4 py-3 font-medium">Source</th>
              <th scope="col" className="px-4 py-3 font-medium">Correlation ID</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const isSelected = selectedId === record.id;

              return (
                <tr
                  key={record.id}
                  tabIndex={0}
                  aria-selected={isSelected}
                  onClick={() => onSelect(record)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onSelect(record);
                    }
                  }}
                  className={`cursor-pointer border-b border-border/80 align-top transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2 ${
                    isSelected ? 'bg-amber-50/60' : 'hover:bg-muted/40'
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">{record.actor}</td>
                  <td className="px-4 py-3 text-foreground">{record.action}</td>
                  <td className="px-4 py-3 font-mono text-foreground">{record.resource}</td>
                  <td className="px-4 py-3 text-foreground">{record.purpose}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{record.timestamp}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${outcomeStyles[record.outcome]}`}>
                      {record.outcome}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground">{record.source}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{record.correlationId.slice(0, 12)}…</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <button
          type="button"
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous audit records page"
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">Page {currentPage}</span>
        <button
          type="button"
          onClick={onNextPage}
          disabled={endIndex >= totalRecords}
          className="rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next audit records page"
        >
          Next
        </button>
      </div>
    </div>
  );
}
