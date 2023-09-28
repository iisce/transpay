import { getAdminMe } from '@/lib/controllers/admin-controller';
import { getAgentMe } from '@/lib/controllers/agent-controller';
import { getSSession, getUserMe } from '@/lib/get-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
	title: 'Transpay - Admins',
	description: 'List of all Admins',
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { role } = await getSSession();
	const user =
		role?.toLowerCase() === 'agent'
			? await getAgentMe()
			: await getAdminMe();
	if (user?.role.toLowerCase() !== 'superadmin') return notFound();
	return <>{children}</>;
}
