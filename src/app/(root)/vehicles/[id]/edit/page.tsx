import VehicleInfoForm from '@/components/forms/edit-vehicle-form';
import { UpdateVehicleForm } from '@/components/forms/update-vehicle-form';
import { Button } from '@/components/ui/button';
import { getVehicleById } from '@/lib/controllers/vehicle-controller';
import { addIcon } from '@/lib/icons';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function VehicleInformationPage({
	params,
}: {
	params: { id: string };
}) {
	const vehicle = await getVehicleById(params.id);
	if (!vehicle) {
		notFound();
	}
	return (
		<>
			<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5  '>
				<div className=' flex justify-between items-center'>
					<h1 className='text-title1Bold py-2'>Edit Vehicle</h1>
				</div>

				<UpdateVehicleForm vehicle={vehicle} />
			</div>
		</>
	);
}
