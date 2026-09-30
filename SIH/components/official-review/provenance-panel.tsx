import { Card } from '@/components/ui/card';
import { type ProvenanceItem } from '@/lib/official-case-review-data';

export interface ProvenancePanelProps {
  provenance: ProvenanceItem;
}

export function ProvenancePanel({ provenance }: ProvenancePanelProps) {
  return (
    <Card className="p-5 sm:p-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Source / provenance
      </p>
      <dl className="mt-4 space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <dt className="min-w-[170px] text-sm font-medium text-muted-foreground">Source system</dt>
          <dd className="text-sm text-foreground">{provenance.sourceSystem}</dd>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <dt className="min-w-[170px] text-sm font-medium text-muted-foreground">Source identifier</dt>
          <dd className="font-mono text-sm text-foreground">{provenance.sourceIdentifier}</dd>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <dt className="min-w-[170px] text-sm font-medium text-muted-foreground">Timestamp</dt>
          <dd className="font-mono text-sm text-foreground">{new Date(provenance.timestamp).toLocaleString('en-IN')}</dd>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <dt className="min-w-[170px] text-sm font-medium text-muted-foreground">Schema / version</dt>
          <dd className="text-sm text-foreground">{provenance.schemaVersion}</dd>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
          <dt className="min-w-[170px] text-sm font-medium text-muted-foreground">Transformation context</dt>
          <dd className="text-sm leading-6 text-foreground">{provenance.transformationContext}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        Credentials are intentionally not shown in the official console.
      </p>
    </Card>
  );
}
