import { AddTrackerForm } from '@/components/forms/add-tracker-form';
import { getVehicleSummary } from '@/lib/controllers/vehicle-controller';
import { notFound } from 'next/navigation';

export default async function AddTrackerPage({
	params,
}: {
	params: { plate: string };
}) {
	const vehicle = await getVehicleSummary(params.plate);
	if (!vehicle) return notFound();
	return (
		<div className='w-full mx-auto max-w-sm rounded-2xl bg-secondary/50 shadow-inner min-h-[60svh] grid place-items-center'>
			<AddTrackerForm vehicle={vehicle} />
		</div>
	);
}
