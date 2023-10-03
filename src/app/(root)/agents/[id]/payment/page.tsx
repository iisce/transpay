import { agentPaymentColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { PAYMENT_TABLE } from '@/lib/consts';
import React from 'react';

export default function Payment() {
	return (
		<div className='w-full flex flex-col gap-3 p-2 xs:p-5 '>
			<div className='flex flex-col gap-2'>
				<div className='flex justify-between py-2'>
					<div className='shrink-0 grow-0 text-title1Bold'>
						Payment History
					</div>
				</div>
				<div className=''>
					<DataTable
						columns={agentPaymentColumns}
						data={PAYMENT_TABLE}
					/>
				</div>
			</div>
		</div>
	);
}
