import { AddTrackerForm } from '@/components/forms/add-tracker-form';
<<<<<<< HEAD
import { getGreenVehicleByPlate } from '@/lib/controllers/green-controller';
import { notFound } from 'next/navigation';
import React from 'react';
=======
import { getVehicleSummary } from '@/lib/controllers/vehicle-controller';
import { notFound } from 'next/navigation';
>>>>>>> 6a1cc05c0953fb639f88815bc1a2de28f72df644

export default async function AddTrackerPage({
	params,
}: {
	params: { plate: string };
}) {
<<<<<<< HEAD
	const vehicle = await getGreenVehicleByPlate(params.plate);
=======
	const vehicle = await getVehicleSummary(params.plate);
>>>>>>> 6a1cc05c0953fb639f88815bc1a2de28f72df644
	if (!vehicle) return notFound();
	return (
		<div className='w-full mx-auto max-w-sm rounded-2xl bg-secondary/50 shadow-inner min-h-[60svh] grid place-items-center'>
			<AddTrackerForm vehicle={vehicle} />
		</div>
	);
}
