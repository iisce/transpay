import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { getDashboard } from '@/lib/get-data';
import type { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Transpay - Dashboard',
	description: 'Payment system for the government',
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const dashboardData = await getDashboard();
	return (
		<div className='h-screen flex flex-col justify-between'>
			<Navbar />
			<div className='flex h-full'>
				<Sidebar />
				{children}
			</div>
		</div>
	);
}
