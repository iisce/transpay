import { Button } from '@/components/ui/button';
import { driversColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getDrivers } from '@/lib/controllers/driver-controller';
import Link from 'next/link';
import React from 'react';

export default async function VehicleDriversPage({
	params,
}: {
	params: { id: string };
}) {
	const drivers = await getDrivers();
	return (
		<div className='p-3 md:p-5 w-full'>
			<div className='flex flex-col gap-2 mb-20'>
				<div className='flex justify-between py-2'>
					<div className='shrink-0 grow-0 text-title1Bold'>
						Drivers
					</div>
					<Button asChild>
						<Link href={`/vehicles/${params.id}/new-driver`}>
							New Driver
						</Link>
					</Button>
				</div>
				<div className=''>
					<DataTable
						showColumns
						showSearch
						showPagination
						searchWith='firstname'
						searchWithPlaceholder='Search with firstname'
						columns={driversColumns}
						data={drivers || []}
					/>
				</div>
			</div>
		</div>
	);
}
