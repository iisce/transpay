import {
	getVehicleById,
	getVehicleSummary,
} from '@/lib/controllers/vehicle-controller';
import { notFound } from 'next/navigation';
import MapView from './map-view';
import { getAllTrackerLocation } from '@/lib/controllers/tracker.controller';

export default async function LocationPage({
	params,
}: {
	params: { id: string };
}) {
	const vehicle = await getVehicleById(params.id);
	const trackerLocation = await getAllTrackerLocation([
		vehicle?.tracker?.terminal_id ?? '',
	]);

	if (!vehicle) return notFound();
	return (
		<div className='flex flex-col '>
			<MapView
				tracker={trackerLocation[0]}
				vehicle={vehicle}
			/>
		</div>
	);
}
