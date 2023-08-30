import { viewDriversColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { DRIVER_TABLE, VIEWDRIVER_TABLE } from '@/lib/consts';
import React from 'react';

export default function Payments({ params }: { params: { plate: string } }) {
	const vehicle = DRIVER_TABLE.find(
		(driver) => driver.plate === params.plate
	);
	return (
		<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 overflow-y-scroll'>
			<div className=' text-title1Bold py-2 '>
				ALL PAYMENTS for verhicle owned by {vehicle?.name}
			</div>

			<div className='flex flex-col gap-2 mb-20'>
				<div className=''>
					<DataTable
						columns={viewDriversColumns}
						data={VIEWDRIVER_TABLE}
					/>
				</div>
			</div>
		</div>
	);
}
