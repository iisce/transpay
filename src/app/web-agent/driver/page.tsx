import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/table/data-table';
import {  webAgentDriversColumns } from '@/components/ui/table/columns';
import { DRIVER_TABLE } from '@/lib/consts';

export default function Driver() {
	return (
		<div className='p-5 w-full h-full flex flex-col'>
			<div className='flex justify-between'>
				<div className='shrink-0 grow-0'>Drivers</div>
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
							columns={webAgentDriversColumns}
							data={DRIVER_TABLE}
						/>
					</TabsContent>
					<TabsContent value='cleared'>
						<DataTable
							columns={webAgentDriversColumns}
							data={DRIVER_TABLE.filter(
								(agent) => agent.category === 'cleared'
							)}
						/>
					</TabsContent>
					<TabsContent value='debtors'>
						<DataTable
							columns={webAgentDriversColumns}
							data={DRIVER_TABLE.filter(
								(agent) => agent.category === 'debtors'
							)}
						/>
					</TabsContent>
					<TabsContent value='waived'>
						<DataTable
							columns={webAgentDriversColumns}
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
