import SearchVehicle from '@/components/pages/vehicle/search-vehicle';
import {
	getVehicleById,
	getVehicleSummary,
} from '@/lib/controllers/vehicle-controller';
import { isAfter, isBefore } from 'date-fns';

export async function generateMetadata({
	params,
}: {
	params: { bcid: string };
}) {
	const vehicle = await getVehicleById(params.bcid);
	if (vehicle) {
		return {
			title: `${
				vehicle?.owner.name
			} - ${vehicle?.category.toLocaleUpperCase()}`,
		};
	}
}

export default function StatusPage({ params }: { params: { bcid: string } }) {
	return (
		<div className='w-full'>
			<SearchVehicle id={params.bcid} />
		</div>
	);
}
