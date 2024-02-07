import ViewVehicleDetails from '@/components/pages/vehicle/view-vehicle-details';
import { getVehicleById } from '@/lib/controllers/vehicle-controller';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateMetadata({ params }: { params: { id: string } }) {
	const vehicle = await getVehicleById(params.id);
	if (!vehicle) return notFound();
	const isOwing = vehicle.VehicleBalance.deficit_balance < 0;
	const totalPendingAmount = -vehicle.VehicleBalance.deficit_balance;
	return {
		title: `${
			vehicle?.owners_name
		} - ${vehicle?.category.toLocaleUpperCase()}`,
		description: `Vehicle is ${
			!isOwing ? 'Cleared' : isOwing && 'Owing ' + totalPendingAmount
		}`,
	};
}
export default async function VehiclePage({
	params,
}: {
	params: { id: string };
}) {
	return (
		<div className='w-full'>
			<ViewVehicleDetails id={params.id} />
		</div>
	);
}
