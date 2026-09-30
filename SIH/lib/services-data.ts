export type ServiceAvailability = 'Available' | 'Limited' | 'Coming Soon';

export type ServiceRecord = {
  id: string;
  name: string;
  description: string;
  category: string;
  department: string;
  availability: ServiceAvailability;
  popularity: number;
  complexity: 'Low' | 'Medium' | 'High';
};

export const serviceCatalog: ServiceRecord[] = [
  {
    id: 'scholarship-welfare',
    name: 'Scholarship & Welfare',
    description: 'Discover and apply for support schemes that help citizens access education and social assistance.',
    category: 'Education & Welfare',
    department: 'Social Welfare Department',
    availability: 'Available',
    popularity: 96,
    complexity: 'Medium',
  },
  {
    id: 'income-verification',
    name: 'Income Verification',
    description: 'Request and validate income-based eligibility records for public services and institutional checks.',
    category: 'Identity & Verification',
    department: 'Revenue Department',
    availability: 'Available',
    popularity: 91,
    complexity: 'Medium',
  },
  {
    id: 'institution-verification',
    name: 'Institution Verification',
    description: 'Validate institutional credentials or registrations used in public benefit and compliance workflows.',
    category: 'Verification',
    department: 'Department of Education',
    availability: 'Available',
    popularity: 88,
    complexity: 'Medium',
  },
  {
    id: 'benefit-payment',
    name: 'Benefit Payment',
    description: 'Track benefit disbursement status and supporting documentation for payment processing.',
    category: 'Financial Support',
    department: 'State Treasury Office',
    availability: 'Limited',
    popularity: 84,
    complexity: 'High',
  },
  {
    id: 'certificate-services',
    name: 'Certificate Services',
    description: 'Apply for and monitor certificates, such as residency, caste, and income-related documentation.',
    category: 'Certificates',
    department: 'District Administration',
    availability: 'Available',
    popularity: 95,
    complexity: 'Low',
  },
  {
    id: 'grievance',
    name: 'Grievance',
    description: 'Raise and track service-related concerns with relevant departments through a single, structured route.',
    category: 'Support & Redressal',
    department: 'Public Grievance Cell',
    availability: 'Available',
    popularity: 79,
    complexity: 'Low',
  },
  {
    id: 'birth-certificate',
    name: 'Birth Certificate',
    description: 'Submit birth registration or correction requests and monitor application updates.',
    category: 'Certificates',
    department: 'Civil Registration Office',
    availability: 'Available',
    popularity: 90,
    complexity: 'Low',
  },
  {
    id: 'property-claims',
    name: 'Property Claims',
    description: 'Access records and guidance for claims or procedural submissions related to land and property records.',
    category: 'Land & Property',
    department: 'Revenue Records Office',
    availability: 'Coming Soon',
    popularity: 62,
    complexity: 'High',
  },
];

export const categoryOptions = ['All', ...new Set(serviceCatalog.map((service) => service.category))];
export const departmentOptions = ['All', ...new Set(serviceCatalog.map((service) => service.department))];
export const availabilityOptions = ['All', 'Available', 'Limited', 'Coming Soon'];
export const popularityOptions = ['All', 'High', 'Medium', 'Low'];
