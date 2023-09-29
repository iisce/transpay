import ViewVehicleDetails from '@/components/pages/vehicle/view-vehicle-details';
import React from 'react';

export default function VehiclePage({ params }: { params: { id: string } }) {
	return (
		<div className='w-full'>
			<ViewVehicleDetails id={params.id} />
		</div>
	);
}
