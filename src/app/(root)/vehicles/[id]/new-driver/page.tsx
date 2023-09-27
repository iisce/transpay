'use client';

import { DriverForm } from '@/components/forms/new-driver-form';

export default function AddDriver({ params }: { params: { id: string } }) {
	return (
		<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 overflow-y-scroll'>
			<div className='text-title1Bold py-6'>Add new driver for</div>
			<div className='flex items-center justify-between w-full'>
				<DriverForm id={params.id} />
			</div>
		</div>
	);
}
