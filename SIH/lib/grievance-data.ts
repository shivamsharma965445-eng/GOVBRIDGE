export type GrievanceStatus = 'Created' | 'Under Review' | 'Resolved';

export interface GrievanceData {
  grievanceId: string;
  caseId: string;
  category: string;
  description: string;
  supportingInformation: string;
  status: GrievanceStatus;
  createdDate: string;
  resolution: string;
}

export const grievanceStatusStyles: Record<
  GrievanceStatus,
  { tone: 'active' | 'pending' | 'inactive'; label: string }
> = {
  Created: { tone: 'pending', label: 'Created' },
  'Under Review': { tone: 'pending', label: 'Under Review' },
  Resolved: { tone: 'active', label: 'Resolved' },
};

export const demoGrievanceData: GrievanceData = {
  grievanceId: 'GRV-1093',
  caseId: 'GOV-2026-000184',
  category: 'Status update',
  description:
    'I would like a plain-language explanation of the current case status and what happens next.',
  supportingInformation: 'No supporting files attached in the demo flow.',
  status: 'Created',
  createdDate: '2026-09-08T09:00:00Z',
  resolution: 'A response will be added after review.',
};
