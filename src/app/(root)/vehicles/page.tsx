import { Button } from '@/components/ui/button';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/table/data-table';
import { vehiclesColumns } from '@/components/ui/table/columns';
import { getSSession } from '@/lib/get-data';
import { getVehicles } from '@/lib/controllers/vehicle-controller';
import AgentSearchBar from '@/components/ui/agent-search-bar';

export default async function Vehicles() {
	const [session, vehicles] = await Promise.all([
		getSSession(),
		getVehicles(),
	]);
	return (
		<div className='p-5 w-full h-full flex flex-col'>
			<div className='flex justify-between'>
				<div className='shrink-0 grow-0'>VEHICLES</div>
				<div className='shrink-0 grow-0'>
					<Button
						className='justify-start text-white rounded-xl bg-primary-800'
						asChild
						variant={'default'}
					>
						<Link
							href={'/vehicles/new-vehicle'}
							className='shrink-0 whitespace-nowrap'
						>
							<div className='mr-2 h-4 w-4 shrink-0'>
								{addIcon}
							</div>
							NEW VEHICLE
						</Link>
					</Button>
				</div>
			</div>
			{vehicles && session.role?.toLowerCase() !== 'agent' ? (
				<div className='flex flex-col gap-5 overflow-y-scroll'>
					<Tabs
						defaultValue='all'
						className='w-full'
					>
						<TabsList>
							<TabsTrigger
								className=''
								value='all'
							>
								All Vehicles
							</TabsTrigger>
							<TabsTrigger value='cleared'>
								Cleared
							</TabsTrigger>
							<TabsTrigger value='debtors'>
								Debtors
							</TabsTrigger>
							<TabsTrigger value='waived'>
								Waived
							</TabsTrigger>
						</TabsList>
						<TabsContent value='all'>
							<DataTable
								showSearch
								searchWith='plate_number'
								searchWithPlaceholder='Search with plate number'
								showColumns
								showPagination
								columns={vehiclesColumns}
								data={vehicles}
							/>
						</TabsContent>
						<TabsContent value='cleared'>
							<DataTable
								showSearch
								searchWith='plate_number'
								searchWithPlaceholder='Search with plate number'
								showColumns
								showPagination
								columns={vehiclesColumns}
								data={vehicles.filter(
									(vehicle) =>
										vehicle.status === 'active'
								)}
							/>
						</TabsContent>
						<TabsContent value='debtors'>
							<DataTable
								showSearch
								searchWith='plate_number'
								searchWithPlaceholder='Search with plate number'
								showColumns
								showPagination
								columns={vehiclesColumns}
								data={vehicles.filter(
									(vehicle) =>
										vehicle.status === 'inactive'
								)}
							/>
						</TabsContent>
						<TabsContent value='waived'>
							<DataTable
								showSearch
								searchWith='plate_number'
								searchWithPlaceholder='Search with plate number'
								showColumns
								showPagination
								columns={vehiclesColumns}
								data={vehicles.filter(
									(vehicle) =>
										vehicle.status === 'waived'
								)}
							/>
						</TabsContent>
					</Tabs>
				</div>
			) : (
				<div className='max-w-[500px] w-full h-full mx-auto grid place-items-center'>
					<AgentSearchBar
						placeholder='Enter vehicle plate'
						variant='primary'
					/>
				</div>
			)}
		</div>
	);
}
