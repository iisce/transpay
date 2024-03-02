import SearchVehicle from '@/components/pages/vehicle/search-vehicle';
import { getVehicleSummary } from '@/lib/controllers/vehicle-controller';

export async function generateMetadata({
	params,
}: {
	params: { bcid: string };
}) {
	const vehicle = await getVehicleSummary(params.bcid);
	if (vehicle) {
		const isOwing = vehicle.VehicleBalance.deficit_balance < 0;
		const totalPendingAmount = -vehicle.VehicleBalance.deficit_balance;
		return {
			title: `${
				vehicle?.owners_name
			} - ${vehicle?.category.toLocaleUpperCase()}`,
			description: `Vehicle is ${
				!isOwing
					? 'Cleared'
					: isOwing && 'Owing ' + totalPendingAmount
			}`,
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
