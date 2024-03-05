import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import { getSSession } from '@/lib/get-data';
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
	const session = await getSSession();
	const isLoggedIn = !!session.role;
	return (
		<div className=''>
			<Navbar />
			<div className=''>
				<Sidebar />
				<div className={`${isLoggedIn ? 'md:ml-52 ' : ''} pt-20`}>
					{children}
				</div>
			</div>
		</div>
	);
}
