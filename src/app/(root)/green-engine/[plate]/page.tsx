import { Button } from '@/components/ui/button';
import { getVehicleSummary } from '@/lib/controllers/vehicle-controller';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function GreenVehicleInfoPage({
	params,
}: {
	params: { plate: string };
}) {
	const vehicle = await getVehicleSummary(params.plate);
	if (!vehicle) return notFound();
	const hasTracker =
		vehicle.tracker.terminal_id !== null ||
		vehicle.tracker.terminal_id === '';
	return (
		<div>
			<div className='flex flex-col text-center justify-between w-full gap-1'>
				<div className='text-sm'>
					<div className='uppercase'>{`Vehicle Owner`}</div>
					<div className='text-xl font-bold'>
						{vehicle.owner.name}
					</div>
				</div>
				<div className='text-sm uppercase mb-10'>
					<div className=''>Plate number</div>
					<div className='text-xl font-bold'>
						{vehicle.plate_number}
					</div>
				</div>
				{hasTracker ? (
					<div className='text-sm uppercase'>
						<div className='mb-2'>Tracker ID</div>
						<div className='text-xl font-bold'>
							{vehicle.tracker.terminal_id}
						</div>
					</div>
				) : (
					<div className='text-sm uppercase'>
						<div className='mb-2'>No Tracker Found</div>
						<Link
							href={`/green-engine/${vehicle.plate_number.toLowerCase()}/add`}
						>
							<Button
								variant={'secondary'}
								className='shadow-md hover:shadow-xl transition-all'
							>
								Add Tracker
							</Button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
