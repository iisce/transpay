import { AddTrackerForm } from '@/components/forms/add-tracker-form';
import Jap from '@/components/shared/json-animation-player';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { getGreenVehicleByPlate } from '@/lib/controllers/green-controller';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function GreenVehicleInfoPage({
	params,
}: {
	params: { plate: string };
}) {
	const vehicle = await getGreenVehicleByPlate(params.plate);
	if (!vehicle) return notFound();
	const hasTracker = vehicle.tracker_id !== null;
	return (
		<div>
			<div className='flex flex-col text-center justify-between w-full gap-1'>
				<div className='text-sm'>
					<div className='uppercase'>{`Vehicle Owner`}</div>
					<div className='text-xl font-bold'>
						{vehicle.owners_name}
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
							{vehicle.tracker_id}
						</div>
					</div>
				) : (
					<div className='text-sm uppercase'>
						<div className=''>No Tracker Found</div>
						<Dialog>
							<DialogTrigger>
								<Card className='bg-secondary overflow-hidden h-full  shadow-md hover:shadow-xl transition-all'>
									<CardContent className='p-3'>
										<div className='flex flex-col gap-1.5'>
											<div className=' text-bodyBold uppercase'>
												Add Tracker
											</div>
										</div>
									</CardContent>
								</Card>
							</DialogTrigger>
							<DialogContent className='sm:max-w-[425px]'>
								<AddTrackerForm vehicle={vehicle} />
							</DialogContent>
						</Dialog>
					</div>
				)}
			</div>
		</div>
	);
}
