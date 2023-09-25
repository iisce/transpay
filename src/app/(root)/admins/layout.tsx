import { getUserMe } from '@/lib/get-data';
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
	const user = await getUserMe();
	if (user?.role.toLowerCase() !== 'superadmin') return notFound();
	return <>{children}</>;
}
