import { options } from '@/app/api/auth/options';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
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
	const session = await getServerSession(options);
	if (session?.user.role.toLowerCase() !== 'superadmin') return notFound();
	return <>{children}</>;
}
