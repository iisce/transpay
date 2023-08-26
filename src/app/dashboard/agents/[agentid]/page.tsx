import ViewAgentDetails from '@/components/pages/agents/view-agent-details';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { agentPaymentColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { PAYMENT_TABLE } from '@/lib/consts';
import React from 'react';

export default function SingularAgent() {
	return (
		<div className='p-5 gap-5 w-full h-full flex flex-col'>
			<div className='flex justify-between'>
				<div className='shrink-0 grow-0 text-title1Bold'>Agent Name</div>
				<div className='shrink-0 grow-0'>
					<Button
						asChild
						variant={'default'}
					>
						<div className='justify-start rounded-xl flex gap-2'>
							<Checkbox className='border-secondary text-primary bg-secondary' />
							Make an Admin
						</div>
					</Button>
				</div>
			</div>
			<div className='flex flex-col gap-5 overflow-y-scroll'>
				<div className='space-y-6'>
					<div>
						<h3 className='bg-primary-800 h-12 p-2  rounded-lg px-5 text-title1Bold'>
							Profile
						</h3>
					</div>
					<ViewAgentDetails />
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
							data={PAYMENT_TABLE}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
