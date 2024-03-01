import { getVehicleSummary } from '@/lib/controllers/vehicle-controller';
import { notFound } from 'next/navigation';
import MapView from './map-view';

export default async function LocationPage({
	params,
}: {
	params: { id: string };
}) {
	const vehicle = await getVehicleSummary(params.id);
	if (!vehicle) return notFound();
	return (
		<div className='px-5 lg:px-10 flex flex-col'>
			<MapView vehicle={vehicle} />
		</div>
	);
}
