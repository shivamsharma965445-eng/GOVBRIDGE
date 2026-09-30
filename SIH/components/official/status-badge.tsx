import { Badge } from '@/components/ui/badge';
import type { CaseSlaState, OfficialCaseState } from '@/lib/official-console-data';

export interface OfficialStatusBadgeProps {
  status: OfficialCaseState | CaseSlaState;
  label?: string;
}

const toneMap: Record<OfficialStatusBadgeProps['status'], 'active' | 'pending' | 'inactive'> = {
  'On Track': 'active',
  'At Risk': 'pending',
  Breached: 'inactive',
  Submitted: 'pending',
  'Identity verified': 'active',
  'Documents validated': 'active',
  'Department review': 'pending',
  'Field verification': 'pending',
  Approved: 'active',
};

export function StatusBadge({ status, label }: OfficialStatusBadgeProps) {
  const tone = toneMap[status];

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
      {label || status}
    </Badge>
  );
}
