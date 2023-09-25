import type { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Transpay - Vehicles',
	description: 'List of all vehicles',
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
