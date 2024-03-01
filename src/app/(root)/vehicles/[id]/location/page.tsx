import { getVehicleById } from '@/lib/controllers/vehicle-controller';
import MapView from './map-view';
import { notFound } from 'next/navigation';

export default async function LocationPage({
	params,
}: {
	params: { id: string };
}) {
	const vehicle = await getVehicleById(params.id);
	if (!vehicle) return notFound();
	return (
		<div className='px-5 lg:px-10 flex flex-col'>
			<MapView vehicle={vehicle} />
		</div>
	);
}
