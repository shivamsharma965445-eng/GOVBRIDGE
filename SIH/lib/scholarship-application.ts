export type ScholarshipStep = 'applicant' | 'eligibility' | 'supporting' | 'review' | 'consent';

export interface ScholarshipApplicationDraft {
  fullName: string;
  dateOfBirth: string;
  mobileNumber: string;
  email: string;
  addressLine: string;
  district: string;
  pincode: string;
  institutionName: string;
  courseName: string;
  academicYear: string;
  familyIncome: string;
  studyMode: 'full-time' | 'part-time';
  firstGenerationStudent: 'yes' | 'no';
  documentStatus: 'ready' | 'partial' | 'pending';
  supportNote: string;
  bankAccountLast4: string;
  preferredContact: 'sms' | 'email';
}

export interface ScholarshipApplicationState {
  step: ScholarshipStep;
  caseId: string | null;
  submitted: boolean;
  draft: ScholarshipApplicationDraft;
}

export interface ValidationErrors {
  [field: string]: string;
}

export const scholarshipSteps: Array<{ key: ScholarshipStep; label: string; description: string }> = [
  {
    key: 'applicant',
    label: 'Applicant details',
    description: 'Basic contact information used only once',
  },
  {
    key: 'eligibility',
    label: 'Eligibility information',
    description: 'Information needed to check scholarship fit',
  },
  {
    key: 'supporting',
    label: 'Supporting information',
    description: 'Documents and context for review',
  },
  {
    key: 'review',
    label: 'Review',
    description: 'Confirm details before consent',
  },
  {
    key: 'consent',
    label: 'Consent',
    description: 'Final step before submission',
  },
];

export const scholarshipDraftStorageKey = 'govbridge.scholarship-application-draft';

export const scholarshipApplicationCaseId = 'GOV-2026-000184';

export const defaultScholarshipDraft: ScholarshipApplicationDraft = {
  fullName: 'Priya Sharma',
  dateOfBirth: '2005-09-14',
  mobileNumber: '+91 98765 43210',
  email: 'priya.sharma@example.demo',
  addressLine: '42 Lake View Road, Ward 12',
  district: 'Bengaluru Urban',
  pincode: '560001',
  institutionName: 'Government Degree College',
  courseName: 'Bachelor of Commerce',
  academicYear: '2026-2027',
  familyIncome: '240000',
  studyMode: 'full-time',
  firstGenerationStudent: 'yes',
  documentStatus: 'ready',
  supportNote: 'All supporting documents are already prepared in demo mode.',
  bankAccountLast4: '4821',
  preferredContact: 'sms',
};

export const emptyScholarshipDraft = (): ScholarshipApplicationDraft => ({
  fullName: '',
  dateOfBirth: '',
  mobileNumber: '',
  email: '',
  addressLine: '',
  district: '',
  pincode: '',
  institutionName: '',
  courseName: '',
  academicYear: '',
  familyIncome: '',
  studyMode: 'full-time',
  firstGenerationStudent: 'yes',
  documentStatus: 'pending',
  supportNote: '',
  bankAccountLast4: '',
  preferredContact: 'sms',
});

export const getScholarshipStepIndex = (step: ScholarshipStep): number =>
  scholarshipSteps.findIndex((item) => item.key === step);

export const getScholarshipProgress = (step: ScholarshipStep): number => {
  const index = getScholarshipStepIndex(step);
  return Math.max(0, Math.min(100, ((index + 1) / scholarshipSteps.length) * 100));
};

export const validateApplicantStep = (draft: ScholarshipApplicationDraft): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!draft.fullName.trim()) {
    errors.fullName = 'Enter the applicant name.';
  }
  if (!draft.dateOfBirth.trim()) {
    errors.dateOfBirth = 'Select the date of birth.';
  }
  if (!draft.mobileNumber.trim()) {
    errors.mobileNumber = 'Enter a contact number.';
  }
  if (!draft.email.trim()) {
    errors.email = 'Enter an email address.';
  }
  if (!draft.addressLine.trim()) {
    errors.addressLine = 'Enter the address line.';
  }
  if (!draft.district.trim()) {
    errors.district = 'Enter the district.';
  }
  if (!draft.pincode.trim()) {
    errors.pincode = 'Enter the pincode.';
  }

  return errors;
};

export const validateEligibilityStep = (draft: ScholarshipApplicationDraft): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!draft.institutionName.trim()) {
    errors.institutionName = 'Enter the institution name.';
  }
  if (!draft.courseName.trim()) {
    errors.courseName = 'Enter the course name.';
  }
  if (!draft.academicYear.trim()) {
    errors.academicYear = 'Enter the academic year.';
  }
  if (!draft.familyIncome.trim()) {
    errors.familyIncome = 'Enter the annual family income.';
  }

  return errors;
};

export const validateSupportingStep = (draft: ScholarshipApplicationDraft): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!draft.bankAccountLast4.trim()) {
    errors.bankAccountLast4 = 'Enter the last 4 digits of the bank account.';
  }
  if (!draft.supportNote.trim()) {
    errors.supportNote = 'Add a short supporting note.';
  }

  return errors;
};

export const formatCurrency = (value: string): string => {
  const amount = Number(value);
  if (Number.isNaN(amount)) {
    return value;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDisplayDate = (value: string): string => {
  if (!value) return 'Not provided';

  const date = new Date(value);
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
