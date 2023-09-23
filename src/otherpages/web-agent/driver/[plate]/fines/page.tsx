import FineDriverForm from '@/components/forms/add-fine-form';
import { viewDriversColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { VIEW_DRIVER_TABLE } from '@/lib/consts';
import { addIcon } from '@/lib/icons';
import React from 'react';

export default function AddNewDriver({
	params,
}: {
	params: { plate: string };
}) {
	return (
		<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 overflow-y-scroll'>
			<div className=''>
				<h1 className=' text-title1Bold py-2 '>Fine Driver</h1>
				<p className=' text-title2Bold pb-3'>
					Fill in Drivers Offence and Fine
				</p>
			</div>

			<div className='h-12 shrink-0 bg-primary w-full rounded-2xl flex my-8 overflow-hidden text-white items-center'>
				<div className='h-12 w-12 bg-black p-3'>{addIcon}</div>
				<div className='p-3'>Fine Charges</div>
			</div>
			<div className=''>
				<FineDriverForm plate={params.plate} />
			</div>

			<div className='flex flex-col gap-2 mb-20'>
				<div className='flex justify-between py-2'>
					<div className='shrink-0 grow-0 text-title1Bold'>
						Fine History
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
