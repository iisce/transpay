import AddLicenseForm from '@/components/forms/add-license-form';
import React from 'react';

export default function AddNewDriver({ params }: { params: { id: string } }) {
	return (
		<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 '>
			<div className=''>
				<h1 className=' text-title1Bold py-2 '>
					{`Add Drivers License`}
				</h1>
			</div>
			<div className=''>
				<AddLicenseForm id={params.id} />
			</div>
		</div>
	);
}
