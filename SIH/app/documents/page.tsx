'use client';

import * as React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';

const initialDocuments = [
	{
		id: 'doc-1',
		name: 'Income certificate.pdf',
		kind: 'Certificate',
		uploadedAt: '2026-08-12',
		size: '138 KB',
	},
	{
		id: 'doc-2',
		name: 'College admission letter.pdf',
		kind: 'Qualification',
		uploadedAt: '2026-08-15',
		size: '245 KB',
	},
	{
		id: 'doc-3',
		name: 'Bank account proof.pdf',
		kind: 'Finance',
		uploadedAt: '2026-08-20',
		size: '92 KB',
	},
];

export default function DocumentsPage() {
	const [documents, setDocuments] = React.useState(initialDocuments);
	const [selectedKind, setSelectedKind] = React.useState('All');
	const [message, setMessage] = React.useState<string | null>(null);
	const fileInputRef = React.useRef<HTMLInputElement | null>(null);

	const filteredDocuments = React.useMemo(() => {
		if (selectedKind === 'All') return documents;
		return documents.filter((document) => document.kind === selectedKind);
	}, [documents, selectedKind]);

	const handleDownload = (documentName: string) => {
		const blob = new Blob(
			[
				`GovBridge demo document\n\nName: ${documentName}\nType: ${documentName}\nUploaded: ${new Date().toISOString().slice(0, 10)}\n\nThis is a frontend demo file generated in the browser. No real government document is being retrieved.`,
			],
			{
				type: 'text/plain;charset=utf-8',
			},
		);
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = documentName.replace(/\s+/g, '-') + '.txt';
		anchor.click();
		URL.revokeObjectURL(url);
		setMessage(`Downloaded ${documentName}`);
	};

	const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const newDocument = {
			id: `doc-${Date.now()}`,
			name: file.name,
			kind: 'Uploaded',
			uploadedAt: new Date().toISOString().slice(0, 10),
			size: `${Math.max(10, Math.round(file.size / 1024))} KB`,
		};

		setDocuments((current) => [newDocument, ...current]);
		setMessage(`Uploaded ${file.name}`);
		event.target.value = '';
	};

	const handleDelete = (id: string) => {
		setDocuments((current) => current.filter((document) => document.id !== id));
		setMessage('Document removed from the demo list.');
	};

	const handleReplace = (id: string) => {
		setDocuments((current) =>
			current.map((document) =>
				document.id === id
					? {
							...document,
							name: `${document.name.replace(/\.pdf$/i, '')} (updated).pdf`,
							uploadedAt: new Date().toISOString().slice(0, 10),
					  }
					: document,
			),
		);
		setMessage('Document marked as updated in the demo record.');
	};

	return (
		<AppShell
			brand="GOVBRIDGE"
			navItems={[
				{ label: 'Dashboard', href: '/dashboard' },
				{ label: 'Services', href: '/services' },
				{ label: 'Applications', href: '/applications' },
				{ label: 'Support', href: '/support' },
			]}
			mobileNavItems={[
				{ label: 'Dashboard', href: '/dashboard' },
				{ label: 'Services', href: '/services' },
				{ label: 'Applications', href: '/applications' },
				{ label: 'Support', href: '/support' },
			]}
			secondaryActions={[{ label: 'Back to dashboard', href: '/dashboard' }]}
			breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Documents' }]}
			footerLinks={[
				{ label: 'Privacy', href: '/privacy' },
				{ label: 'Accessibility', href: '/accessibility' },
				{ label: 'Support', href: '/support' },
			]}
			footerNote="Demo document actions for prototype validation."
		>
			<Container className="py-8 sm:py-12">
				<PageHeader
					eyebrow="Documents"
					title="Your uploaded documents"
					description="This prototype keeps a demo document trail so you can test real actions without connecting a government file store."
				/>

				<div className="mt-8 rounded-xl border border-border bg-card p-4 shadow-soft sm:p-6">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<label
								htmlFor="document-kind"
								className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
							>
								Filter by type
							</label>
							<select
								id="document-kind"
								value={selectedKind}
								onChange={(event) => setSelectedKind(event.target.value)}
								className="min-h-[48px] w-full rounded-md border border-border bg-background px-3 py-3 text-base text-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2 lg:min-w-[220px]"
							>
								{['All', 'Certificate', 'Qualification', 'Finance', 'Uploaded'].map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row">
							<button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9b7310] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
							>
								Upload document
							</button>
							<input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} />
						</div>
					</div>

					{message ? (
						<p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
							{message}
						</p>
					) : null}
				</div>

				<div className="mt-8 grid gap-6">
					{filteredDocuments.length > 0 ? (
						filteredDocuments.map((document) => (
							<Card key={document.id} className="p-5 sm:p-6">
								<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
									<div>
										<p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
											{document.kind}
										</p>
										<h2 className="mt-2 text-xl font-semibold text-foreground">{document.name}</h2>
										<div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
											<span>Uploaded on {document.uploadedAt}</span>
											<span>{document.size}</span>
										</div>
									</div>

									<div className="flex flex-wrap gap-3">
										<button
											type="button"
											onClick={() => handleDownload(document.name)}
											className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
										>
											Download
										</button>
										<button
											type="button"
											onClick={() => handleReplace(document.id)}
											className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
										>
											Replace
										</button>
										<button
											type="button"
											onClick={() => handleDelete(document.id)}
											className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-[#F5D7D7] bg-[#FFFBFB] px-4 py-2 text-sm font-medium text-[#8B3A3A] transition-colors hover:bg-[#FDF2F2] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
										>
											Delete
										</button>
									</div>
								</div>
							</Card>
						))
					) : (
						<Card className="p-6 text-center">
							<p className="text-xl text-foreground">No documents match this filter.</p>
							<p className="mt-2 text-sm text-muted-foreground">
								Try another document type or upload a new file.
							</p>
						</Card>
					)}
				</div>

				<div className="mt-8">
					<Link
						href="/apply/scholarship"
						className="inline-flex min-h-[44px] items-center text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(184,134,11,0.18)] focus-visible:ring-offset-2"
					>
						Continue application
					</Link>
				</div>
			</Container>
		</AppShell>
	);
}
