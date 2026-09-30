export type ConsentStatus = 'Pending' | 'Approved' | 'Denied' | 'Expired' | 'Revoked';

export interface ConsentAttribute {
  label: string;
  description: string;
}

export interface ConsentReceiptData {
  requester: string;
  provider: string;
  purpose: string;
  attributes: string[];
  timestamp: string;
  expiry: string;
  citizenAction: 'Approved data sharing' | 'Denied data sharing' | 'Revoked consent';
  correlationId: string;
}

export interface ConsentCaseData {
  caseId: string;
  requester: string;
  provider: string;
  purpose: string;
  requestedInformation: string;
  validityDays: number;
  status: ConsentStatus;
  attributes: ConsentAttribute[];
  privacyExplanation: string;
  summaryNotes: string[];
}

export interface ConsentApiPayload {
  caseId: string;
  action: 'approve' | 'deny' | 'revoke';
  timestamp: string;
}

export interface ConsentApiResponse {
  caseId: string;
  status: ConsentStatus;
  receipt?: ConsentReceiptData;
}

export const demoConsentCase: ConsentCaseData = {
  caseId: 'GOV-2026-000184',
  requester: 'Scholarship Department',
  provider: 'Income Department',
  purpose: 'Scholarship eligibility verification',
  requestedInformation: 'Income eligibility status',
  validityDays: 30,
  status: 'Pending',
  attributes: [
    {
      label: 'Income eligibility status',
      description: 'Confirms whether the household income falls within the scholarship threshold.',
    },
  ],
  privacyExplanation:
    'GovBridge shares only the minimum information needed for this consent request. The receiving team does not get full records, documents, or raw department payloads in this UI.',
  summaryNotes: [
    'This request is scoped to one scholarship case.',
    'The permission expires automatically after 30 days.',
    'The consent screen shows only clear, human-readable details.',
  ],
};

export const consentStatusStyles: Record<ConsentStatus, { tone: 'active' | 'pending' | 'inactive'; label: string }> = {
  Pending: { tone: 'pending', label: 'Pending' },
  Approved: { tone: 'active', label: 'Approved' },
  Denied: { tone: 'inactive', label: 'Denied' },
  Expired: { tone: 'inactive', label: 'Expired' },
  Revoked: { tone: 'inactive', label: 'Revoked' },
};

export const buildConsentReceipt = (
  caseData: ConsentCaseData,
  action: 'approve' | 'deny' | 'revoke',
  timestamp: string,
): ConsentReceiptData => {
  const citizenActionMap: Record<typeof action, ConsentReceiptData['citizenAction']> = {
    approve: 'Approved data sharing',
    deny: 'Denied data sharing',
    revoke: 'Revoked consent',
  };

  const expiryDate = new Date(timestamp);
  expiryDate.setDate(expiryDate.getDate() + caseData.validityDays);

  return {
    requester: caseData.requester,
    provider: caseData.provider,
    purpose: caseData.purpose,
    attributes: caseData.attributes.map((attribute) => attribute.label),
    timestamp,
    expiry: expiryDate.toISOString(),
    citizenAction: citizenActionMap[action],
    correlationId: `CR-${caseData.caseId.replace(/[^A-Z0-9]/g, '')}-${timestamp.replace(/[^0-9]/g, '').slice(0, 12)}`,
  };
};

export const consentApi = {
  async loadCase(caseId: string): Promise<ConsentCaseData> {
    if (caseId !== demoConsentCase.caseId) {
      throw new Error('Consent case not found in demo data.');
    }

    return demoConsentCase;
  },

  async submitDecision(payload: ConsentApiPayload): Promise<ConsentApiResponse> {
    const caseData = await this.loadCase(payload.caseId);

    if (payload.action === 'approve') {
      return {
        caseId: payload.caseId,
        status: 'Approved',
        receipt: buildConsentReceipt(caseData, 'approve', payload.timestamp),
      };
    }

    if (payload.action === 'deny') {
      return {
        caseId: payload.caseId,
        status: 'Denied',
        receipt: buildConsentReceipt(caseData, 'deny', payload.timestamp),
      };
    }

    return {
      caseId: payload.caseId,
      status: 'Revoked',
      receipt: buildConsentReceipt(caseData, 'revoke', payload.timestamp),
    };
  },
};
