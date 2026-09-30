import { Card } from '@/components/ui/card';

export interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  tone: 'active' | 'pending' | 'inactive';
}

const toneStyles = {
  active: 'border-l-[#1F5B36] bg-[#F8FCF8]',
  pending: 'border-l-[#7C5A12] bg-[#FFFDF8]',
  inactive: 'border-l-[#6B7280] bg-[#FBFBFC]',
};

export function MetricCard({ label, value, description, tone }: MetricCardProps) {
  return (
    <Card className={`border-l-4 p-5 sm:p-6 ${toneStyles[tone]}`}>
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl tracking-[-0.04em] text-foreground">{value}</p>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
    </Card>
  );
}
