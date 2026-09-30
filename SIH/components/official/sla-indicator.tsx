import { clsx } from 'clsx';
import { StatusBadge } from './status-badge';
import type { CaseSlaState } from '@/lib/official-console-data';

export interface SLAIndicatorProps {
  status: CaseSlaState;
}

const slatones: Record<CaseSlaState, string> = {
  'On Track': 'bg-[#1F5B36]',
  'At Risk': 'bg-[#7C5A12]',
  Breached: 'bg-[#8B3A3A]',
};

export function SLAIndicator({ status }: SLAIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className={clsx('inline-flex h-2.5 w-2.5 rounded-full', slatones[status])}
      />
      <StatusBadge status={status} label={status} />
    </div>
  );
}
