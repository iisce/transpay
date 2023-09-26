import CreateVehicleForm from '@/components/forms/new-vehicle-form';
import { addIcon, driversProgressIcon1 } from '@/lib/icons';
import React from 'react';

export default function AddNewDriver() {
	return (
		<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 overflow-y-scroll'>
			<div className=''>
				<h1 className=' text-title1Bold py-2 '>Add New Vehicle</h1>
			</div>
			{/* <div className=' text-primary-900 max-h-16 max-w-sm flex justify-start'>
				{driversProgressIcon1}
			</div> */}
			<div className='h-12 shrink-0 bg-primary w-full rounded-2xl flex overflow-hidden text-white items-center'>
				<div className='h-12 w-12 bg-black p-3'>{addIcon}</div>
				<div className='p-3'>VEHICLE INFORMATION</div>
			</div>
			<div className=''>
				<CreateVehicleForm />
			</div>
		</div>
	);
}
