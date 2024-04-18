import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/options';
export const metadata: Metadata = {
	title: 'Transpay - Dashboard',
	description: 'Payment system for the government',
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(options);
	return (
		<div className=''>
			<Navbar />
			<div className=''>
				<Sidebar />
				<div className={`${session ? 'md:ml-52 ' : ''} pt-20`}>
					{children}
				</div>
			</div>
		</div>
	);
}
