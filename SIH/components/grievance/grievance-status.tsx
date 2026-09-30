import { Badge } from '@/components/ui/badge';
import { grievanceStatusStyles, type GrievanceStatus } from '@/lib/grievance-data';

export interface GrievanceStatusProps {
  status: GrievanceStatus;
}

export function GrievanceStatus({ status }: GrievanceStatusProps) {
  const statusInfo = grievanceStatusStyles[status];

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
