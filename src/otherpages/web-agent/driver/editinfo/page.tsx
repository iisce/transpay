'use client';
import VehicleInfoForm from '@/components/forms/web-agent-vehicle-form';
import { addIcon } from '@/lib/icons';
import React, { useState } from 'react';

export default function AddNewDriver({
	params,
}: {
	params: { plate: string };
}) {
	return (
		<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 overflow-y-scroll '>
			<div className=''>
				<h1 className='text-title1Bold py-2'>Vehicle Details</h1>
				<p className='text-title2Bold pb-4'>{`Driver's vehicle details.`}</p>
			</div>

			{/* Vehicle Plate Information */}
			<div className='h-12 shrink-0 bg-primary w-full rounded-2xl flex overflow-hidden text-white items-center'>
				<div className='h-12 w-12 bg-black p-3'>{addIcon}</div>
				<div className='p-3'>Vehicle Information</div>
			</div>

			<div>
				<VehicleInfoForm plate={params.plate} />
			</div>
		</div>
	);
}
