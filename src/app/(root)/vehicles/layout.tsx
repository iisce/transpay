import { Button } from '@/components/ui/button';
import { getSSession } from '@/lib/get-data';
import { PlusIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
	title: 'Transpay - Vehicles',
	description: 'List of all vehicles',
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSSession();
	return (
		<div className='p-5 w-full h-full flex flex-col'>
			<div className='flex justify-between items-center uppercase font-bold'>
				<div className='shrink-0 grow-0'>VEHICLES</div>
				{session?.role?.toLowerCase() !== 'greenengine_agent' && (
					<div className='shrink-0 grow-0'>
						<Button
							className='justify-start text-white rounded-xl bg-primary-800'
							asChild
							variant={'default'}
						>
							<Link
								href={'/vehicles/new-vehicle'}
								className='shrink-0 whitespace-nowrap flex items-center justify-center'
							>
								<PlusIcon className='mr-2 h-4 w-4 shrink-0' />
								NEW VEHICLE
							</Link>
						</Button>
					</div>
				)}
			</div>
			{children}
		</div>
	);
}
