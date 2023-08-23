import { Button } from '@/components/ui/button';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/table/data-table';
import { agentsColumns, driversColumns } from '@/components/ui/table/columns';
import { AGENT_TABLE, DRIVER_TABLE } from '@/lib/consts';

export default function Drivers() {
	return (
		<div className='p-5 w-full h-full flex flex-col'>
			<div className='flex justify-between'>
				<div className='shrink-0 grow-0'>Drivers</div>
				<div className='shrink-0 grow-0'>
					<Button
						className='justify-start rounded-xl'
						asChild
						variant={'default'}
					>
						<Link
							href={'/dashboard/drivers/add-new'}
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
							All Drivers
						</TabsTrigger>
						<TabsTrigger value='cleared'>Cleared</TabsTrigger>
						<TabsTrigger value='debtors'>Debtors</TabsTrigger>
						<TabsTrigger value='waived'>Waived</TabsTrigger>
					</TabsList>
					<TabsContent value='all'>
						<DataTable
							showSearch
							columns={driversColumns}
							data={DRIVER_TABLE}
						/>
					</TabsContent>
					<TabsContent value='cleared'>
						<DataTable
							columns={driversColumns}
							data={DRIVER_TABLE.filter(
								(agent) => agent.status === 'active'
							)}
						/>
					</TabsContent>
					<TabsContent value='debtors'>
						<DataTable
							columns={driversColumns}
							data={DRIVER_TABLE.filter(
								(agent) => agent.status === 'inactive'
							)}
						/>
					</TabsContent>
					<TabsContent value='waived'>Waived</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
