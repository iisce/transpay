import { UpdateAgentForm } from '@/components/forms/update-agent-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { agentPaymentColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { PAYMENT_TABLE } from '@/lib/consts';
import { getAgentById } from '@/lib/controllers/agent-controller';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateMetadata({ params }: { params: { id: string } }) {
	const agent = await getAgentById(params.id);
	return {
		title: agent?.name.toLocaleUpperCase() || 'ISCE | All Agents',
	};
}

export default async function SingularAgent({
	params,
}: {
	params: { id: string };
}) {
	const agent = await getAgentById(params.id);
	if (!agent) return notFound();
	return (
		<div className='p-3 xs:p-5 gap-5 w-full h-full flex flex-col'>
			<div className='flex justify-between items-center'>
				<div className='shrink-0 grow-0'>
					{agent?.name.toLocaleUpperCase()}
				</div>
				<div className='shrink-0 grow-0'>
					<Button
						asChild
						variant={'default'}
					>
						<div className='justify-start rounded-xl flex gap-2'>
							<Checkbox className='border-secondary text-primary bg-secondary' />
							Make an Agent
						</div>
					</Button>
				</div>
			</div>
			<div className='flex flex-col gap-3 xs:gap-5 overflow-y-scroll'>
				<div className='space-y-6'>
					<div className='h-12 shrink-0 bg-primary w-full rounded-2xl flex overflow-hidden text-white items-center'>
						<div className='h-12 w-12 bg-black p-3'>
							{addIcon}
						</div>
						<div className='pl-1'>PERSONAL INFORMATION</div>
					</div>
					<UpdateAgentForm agent={agent} />
				</div>
				<div className='flex flex-col gap-2 mb-20'>
					<div className='flex justify-between py-2'>
						<div className='shrink-0 grow-0 text-title1Bold'>
							Total Payments
						</div>
						<div className='shrink-0 grow-0'>₦200,000</div>
					</div>
					<div>
						<DataTable
							columns={agentPaymentColumns}
							data={PAYMENT_TABLE.slice(0, 5)}
						/>
						<Button
							variant='outline'
							asChild
							className='justify-center items-center shrink-0 grow-0 w-1/5 rounded-xl flex'
						>
							<Link href={'/web-agent/driver/payment'}>
								See More
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
