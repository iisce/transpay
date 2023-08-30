import Navbar from '@/components/layout/navbar';
import WebAgentSidebar from '@/components/layout/web-agent-sidebar';
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
		<div className='h-full'>
			<Navbar />
			<div className='flex h-full'>
				<WebAgentSidebar/>
				{children}
			</div>
		</div>
	);
}
