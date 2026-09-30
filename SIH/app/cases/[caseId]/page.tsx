import { UnifiedCasePage } from '@/components/cases/unified-case-page';

interface UnifiedCaseRouteProps {
  params: { caseId: string };
}

export default function CasePage({ params }: UnifiedCaseRouteProps) {
  return <UnifiedCasePage caseId={params.caseId} />;
}
