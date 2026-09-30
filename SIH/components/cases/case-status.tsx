import { Badge } from '@/components/ui/badge';
import { unifiedCaseStatusStyles, type UnifiedCaseStatus } from '@/lib/case-data';

export interface CaseStatusProps {
  status: UnifiedCaseStatus;
}

export function CaseStatus({ status }: CaseStatusProps) {
  const statusInfo = unifiedCaseStatusStyles[status];

  return (
    <Badge
      className={
        statusInfo.tone === 'active'
          ? 'border-[#D7E9D7] bg-[#F3FAF4] text-[#1F5B36]'
          : statusInfo.tone === 'pending'
            ? 'border-[#F2E7C5] bg-[#FCF6E8] text-[#7C5A12]'
            : 'border-border bg-muted text-muted-foreground'
      }
    >
      {statusInfo.label}
    </Badge>
  );
}
