import { notFound, redirect } from 'next/navigation';

export default function ApplicationCasePage({ params }: { params: { caseId: string } }) {
  if (params.caseId !== 'GOV-2026-000184') {
    notFound();
  }

  redirect(`/cases/${params.caseId}`);
}
