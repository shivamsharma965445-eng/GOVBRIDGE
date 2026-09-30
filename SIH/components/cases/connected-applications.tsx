import { Card } from '@/components/ui/card';
import { type ConnectedApplicationReference } from '@/lib/case-data';

export interface ConnectedApplicationsProps {
  references: ConnectedApplicationReference[];
}

export function ConnectedApplications({ references }: ConnectedApplicationsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {references.map((reference) => (
        <Card key={reference.referenceId} className="p-4 sm:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {reference.label}
          </p>
          <p className="mt-2 font-mono text-lg font-semibold text-foreground">
            {reference.referenceId}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {reference.description}
          </p>
        </Card>
      ))}
    </div>
  );
}
