import { Button } from '@/components/ui/button';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/table/data-table';
import { driversColumns } from '@/components/ui/table/columns';
import { DRIVER_TABLE } from '@/lib/consts';

export default function Drivers() {
	return (
		<div className='p-5 w-full h-full flex flex-col'>
			<div className='flex justify-between'>
				<div className='shrink-0 grow-0'>Drivers</div>
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
							Add New Driver
						</Link>
					</Button>
				</div>
			</div>
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
						<TabsTrigger value='cleared'>Cleared</TabsTrigger>
						<TabsTrigger value='debtors'>Debtors</TabsTrigger>
						<TabsTrigger value='waived'>Waived</TabsTrigger>
					</TabsList>
					<TabsContent value='all'>
						<DataTable
							showSearch
							searchWith='plate'
							columns={driversColumns}
							data={DRIVER_TABLE}
						/>
					</TabsContent>
					<TabsContent value='cleared'>
						<DataTable
							showSearch
							searchWith='plate'
							columns={driversColumns}
							data={DRIVER_TABLE.filter(
								(agent) => agent.category === 'cleared'
							)}
						/>
					</TabsContent>
					<TabsContent value='debtors'>
						<DataTable
							showSearch
							searchWith='plate'
							columns={driversColumns}
							data={DRIVER_TABLE.filter(
								(agent) => agent.category === 'debtors'
							)}
						/>
					</TabsContent>
					<TabsContent value='waived'>
						<DataTable
							showSearch
							searchWith='plate'
							columns={driversColumns}
							data={DRIVER_TABLE.filter(
								(agent) => agent.status === 'waived'
							)}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
