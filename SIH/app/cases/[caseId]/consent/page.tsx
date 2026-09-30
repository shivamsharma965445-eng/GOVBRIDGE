import { ConsentScreen } from '@/components/consent/consent-screen';
import { type ConsentStatus } from '@/lib/consent-data';

interface ConsentPageProps {
  params: { caseId: string };
  searchParams?: { status?: string };
}

const parseConsentStatus = (value?: string): ConsentStatus | undefined => {
  switch (value) {
    case 'Pending':
    case 'Approved':
    case 'Denied':
    case 'Expired':
    case 'Revoked':
      return value;
    default:
      return undefined;
  }
};

export default function ConsentPage({ params, searchParams }: ConsentPageProps) {
  return (
    <ConsentScreen
      caseId={params.caseId}
      initialStatus={parseConsentStatus(searchParams?.status) ?? 'Pending'}
    />
  );
}
