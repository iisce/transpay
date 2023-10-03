import { UpdateDriverForm } from '@/components/forms/update-driver-form';
import { Button } from '@/components/ui/button';
import { getDrivers } from '@/lib/controllers/driver-controller';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateMetadata({ params }: { params: { id: string } }) {
	const drivers = await getDrivers();

	const driver = drivers?.find(
		(singleDriver) => singleDriver.driver_id == params.id
	);
	return {
		title: `Transpay | Driver - ${driver?.firstname} ${driver?.lastname}`,
	};
}
export default async function DriversPage({
	params,
}: {
	params: { id: string };
}) {
	const drivers = await getDrivers();

	const driver = drivers?.find(
		(singleDriver) => singleDriver.driver_id == params.id
	);
	if (!driver) return notFound();

	return (
		<div className='p-5 w-full flex flex-col gap-5 '>
			<div className='flex justify-between'>
				<div className='uppercase'>{`Driver ${driver?.firstname} ${driver?.lastname}`}</div>
				<Button asChild>
					<Link href={`${driver.driver_id}/add-license`}>
						Add License
					</Link>
				</Button>
			</div>
			<UpdateDriverForm driver={driver} />
		</div>
	);
}
