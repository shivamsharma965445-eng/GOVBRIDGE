import { Badge } from '@/components/ui/badge';
import { consentStatusStyles, type ConsentStatus } from '@/lib/consent-data';

export interface ConsentStatusProps {
  status: ConsentStatus;
}

export function ConsentStatus({ status }: ConsentStatusProps) {
  const { tone, label } = consentStatusStyles[status];

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
      {label}
    </Badge>
  );
}
