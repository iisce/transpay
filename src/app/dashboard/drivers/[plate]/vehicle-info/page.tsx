import { DRIVER_TABLE } from '@/lib/consts';
import React from 'react';

export default function VehicleInformationPage({
	params,
}: {
	params: { plate: string };
}) {
	const vehicle = DRIVER_TABLE.find(
		(driver) => driver.plate === params.plate
	);
	return (
		<div className='w-full'>
			VehicleInformationPage for vehicle owned by {vehicle?.name}
		</div>
	);
}
