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
		<div className=''>
			<Navbar />
			<div className=''>
				<Sidebar />
				<div className='md:ml-52 pt-20'>{children}</div>
			</div>
		</div>
	);
}
