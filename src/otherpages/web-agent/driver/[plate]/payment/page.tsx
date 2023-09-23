import { viewDriversColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { VIEW_DRIVER_TABLE } from '@/lib/consts';
import React from 'react';

export default function Payment() {
	return (
		<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 overflow-y-scroll'>
			<div className='flex flex-col gap-2 mb-20'>
				<div className='flex justify-between py-2'>
					<div className='shrink-0 grow-0 text-title1Bold'>
						Payment History
					</div>
				</div>
				<div className=''>
					<DataTable
						columns={viewDriversColumns}
						data={VIEW_DRIVER_TABLE}
					/>
				</div>
			</div>
		</div>
	);
}
