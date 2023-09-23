import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/table/data-table';
import { DRIVER_TABLE } from '@/lib/consts';
import { webAgentDriversColumns } from '@/components/ui/table/columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { addIcon } from '@/lib/icons';

export default function Driver() {
	return (
		<div className='p-6 w-full h-full flex flex-col'>
			<div className='flex justify-between py-8'>
				<div className='shrink-0 grow-0 text-title1Bold'>
					Drivers
				</div>
				<div className='shrink-0 grow-0'>
					<Button
						className='justify-start text-white rounded-xl bg-primary-800'
						asChild
						variant={'default'}
					>
						<Link
							href={'/web-agent/driver/new-vehicle'}
							className='shrink-0 whitespace-nowrap text-bodyBold'
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
					<TabsList className=' text-bodyBold '>
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
