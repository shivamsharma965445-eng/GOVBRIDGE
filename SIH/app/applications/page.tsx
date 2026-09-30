'use client';

import Link from 'next/link';
import * as React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { readDemoState, type DemoCase } from '@/lib/demo-state';

const statusLabels: Record<string, string> = {
	'DRAFT': 'Draft',
	'SUBMITTED': 'Submitted',
	'CONSENT_REQUIRED': 'Consent Required',
	'CONSENT_GRANTED': 'Consent Granted',
	'UNDER_REVIEW': 'Under Review',
	'INFORMATION_REQUIRED': 'Information Required',
	'APPROVED': 'Approved',
	'REJECTED': 'Rejected',
	'COMPLETED': 'Completed',
	'IDENTITY_VERIFIED': 'Identity Verified',
	'DOCUMENTS_VALIDATED': 'Documents Validated',
	'DEPARTMENT_REVIEW': 'Department Review',
	'FIELD_VERIFICATION': 'Field Verification',
};

const statusOptions = [
	'All',
	'SUBMITTED',
	'CONSENT_REQUIRED',
	'UNDER_REVIEW',
	'INFORMATION_REQUIRED',
	'APPROVED',
	'COMPLETED',
];

const normalizeStatus = (status: string) => statusLabels[status] ?? status;

export default function ApplicationsPage() {
	const [query, setQuery] = React.useState('');
	const [statusFilter, setStatusFilter] = React.useState('All');
	const [applications, setApplications] = React.useState<DemoCase[]>([]);

	React.useEffect(() => {
		setApplications(readDemoState().applications);
	}, []);

	const filteredApplications = React.useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return applications.filter((application) => {
			const matchesStatus = statusFilter === 'All' || application.workflowState === statusFilter || application.status === statusFilter;
			const matchesQuery =
				!normalizedQuery ||
				application.caseId.toLowerCase().includes(normalizedQuery) ||
				application.serviceName.toLowerCase().includes(normalizedQuery);

			return matchesStatus && matchesQuery;
		});
	}, [applications, query, statusFilter]);

	return (
		<AppShell
			brand="GOVBRIDGE"
			navItems={[
				{ label: 'Services', href: '/services' },
				{ label: 'My Applications', href: '/applications' },
				{ label: 'Track Case', href: '/track' },
				{ label: 'Help', href: '/support' },
			]}
			secondaryActions={[
				{ label: 'Dashboard', href: '/dashboard' },
				{ label: 'Login', href: '/login' },
			]}
			breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Applications' }]}
			footerLinks={[
				{ label: 'Services', href: '/services' },
				{ label: 'Track Case', href: '/track' },
				{ label: 'Privacy', href: '/privacy' },
				{ label: 'Accessibility', href: '/accessibility' },
			]}
			footerNote="Track your active cases and recent service journeys."
		>
			<Container className="py-8 sm:py-12">
				<PageHeader
					eyebrow="Applications"
					title="Your application overview"
					description="Track active cases and find the next action needed in your current service journey."
				/>

				<div className="mt-8 rounded-xl border border-border bg-card p-4 shadow-soft sm:p-6">
					<div className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
						<div>
							<label htmlFor="application-search" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
								Search applications
							</label>
							<input
								id="application-search"
								type="search"
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Search by case ID or service"
								aria-label="Search applications"
								className="min-h-[48px] w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
							/>
						</div>

						<div>
							<label htmlFor="application-status" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
								Status
							</label>
							<select
								id="application-status"
								value={statusFilter}
								onChange={(event) => setStatusFilter(event.target.value)}
								className="min-h-[48px] w-full rounded-md border border-border bg-background px-3 py-3 text-base text-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
							>
								{statusOptions.map((option) => (
									<option key={option} value={option}>
										{option === 'All' ? option : normalizeStatus(option)}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="mt-4 flex flex-wrap gap-3">
						<button
							type="button"
							onClick={() => {
								setQuery('');
								setStatusFilter('All');
							}}
							className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
						>
							Clear filters
						</button>
					</div>
				</div>

				<div className="mt-8 grid gap-6 lg:grid-cols-2">
					{filteredApplications.length > 0 ? (
						filteredApplications.map((application) => (
							<Card key={application.caseId} className="p-6">
								<p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
									{normalizeStatus(application.workflowState || application.status)}
								</p>
								<h2 className="mt-2 text-2xl font-semibold text-foreground">{application.caseId}</h2>
								<p className="mt-2 text-base text-muted-foreground">{application.serviceName}</p>
								<p className="mt-2 text-sm text-muted-foreground">
									Last updated: {new Date(application.lastUpdated).toLocaleDateString('en-IN')}
								</p>
								<div className="mt-5 flex flex-col gap-3 sm:flex-row">
									<Link
										href={`/cases/${application.caseId}`}
										className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
									>
										View case
									</Link>
									<Link
										href="/track"
										className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
									>
										Track case
									</Link>
								</div>
							</Card>
						))
					) : (
						<div className="lg:col-span-2 rounded-lg border border-dashed border-border bg-card p-8 text-center">
							<p className="text-xl text-foreground">No applications match your search.</p>
							<p className="mt-2 text-sm text-muted-foreground">
								Try a case ID like GOV-2026-000184 or a service name such as scholarship.
							</p>
						</div>
					)}
				</div>
			</Container>
		</AppShell>
	);
}
