import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type EntityMatchData } from '@/lib/official-case-review-data';

export interface EntityMatchCardProps {
  entityMatch: EntityMatchData;
}

export function EntityMatchCard({ entityMatch }: EntityMatchCardProps) {
  const confidenceLabel = `${entityMatch.confidence}% confidence`;

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Entity resolution
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">Potential match</h2>
        </div>
        <Badge>{confidenceLabel}</Badge>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">{entityMatch.summary}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {entityMatch.evidence.map((item) => (
          <Card key={item.label} className="p-4">
            <p className="text-sm font-medium text-foreground">{item.label}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-5 border-[#F2E7C5] bg-[#FCF6E8] p-4 text-sm leading-6 text-[#7C5A12]">
        Human review required: {entityMatch.decisionGuidance}
      </Card>
    </Card>
  );
}
