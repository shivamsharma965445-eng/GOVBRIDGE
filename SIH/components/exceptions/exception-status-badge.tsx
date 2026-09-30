import { Badge } from '@/components/ui/badge';
import { type ExceptionState } from '@/lib/official-exceptions-data';

export interface ExceptionStatusBadgeProps {
  status: ExceptionState;
}

const statusTone: Record<ExceptionState, 'active' | 'pending' | 'inactive'> = {
  Failure: 'inactive',
  'Retry available': 'pending',
  Recovery: 'active',
  'DLQ / Operator Review': 'inactive',
  'Operator Review': 'pending',
};

export function ExceptionStatusBadge({ status }: ExceptionStatusBadgeProps) {
  const tone = statusTone[status];

  return (
    <Badge
      className={
        tone === 'active'
          ? 'border-[#D7E9D7] bg-[#F3FAF4] text-[#1F5B36]'
          : tone === 'pending'
            ? 'border-[#F2E7C5] bg-[#FCF6E8] text-[#7C5A12]'
            : 'border-border bg-muted text-muted-foreground'
      }
    >
      {status}
    </Badge>
  );
}
