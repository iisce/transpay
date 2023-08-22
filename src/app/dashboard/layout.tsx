import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Transpay - Dashboard',
	description: 'Payment system for the government',
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='h-screen w-screen overflow-hidden'>
			<Navbar />
			<div className='flex h-full'>
				<Sidebar />
				{children}
			</div>
		</div>
	);
}
