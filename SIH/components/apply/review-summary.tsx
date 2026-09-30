import { Card } from '@/components/ui/card';

export interface ReviewSectionRow {
  label: string;
  value: string;
}

export interface ReviewSection {
  title: string;
  rows: ReviewSectionRow[];
}

export interface ReviewSummaryProps {
  caseId?: string;
  sections: ReviewSection[];
  note?: string;
}

export function ReviewSummary({ caseId, sections, note }: ReviewSummaryProps) {
  return (
    <div className="space-y-4">
      {caseId ? (
        <Card className="border-accent/20 bg-[#FFF9EC] p-4 sm:p-5">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Demo unified case
          </p>
          <p className="mt-1 font-mono text-lg font-semibold text-foreground">
            {caseId}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This case is ready for the consent step and future backend integration.
          </p>
        </Card>
      ) : null}

      {note ? (
        <p className="text-sm leading-6 text-muted-foreground">{note}</p>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title} className="p-4 sm:p-5">
            <h3 className="text-base font-semibold text-foreground">{section.title}</h3>
            <dl className="mt-4 space-y-3">
              {section.rows.map((row) => (
                <div key={row.label} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <dt className="min-w-[160px] text-sm font-medium text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="text-sm leading-6 text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
      </div>
    </div>
  );
}
