import { Button } from '@/components/ui/button';
import { agentsColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAgents } from '@/lib/controllers/agent-controller';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';

export default async function Agents() {
	// const agents = await getAgents();
	const agents: any[] = [];
	return (
		<div className='p-5 w-full h-full flex flex-col'>
			<div className='flex justify-between'>
				<div className='shrink-0 grow-0'>Agent</div>
				<div className='shrink-0 grow-0'>
					<Button
						className='justify-start text-white rounded-xl bg-primary-800'
						asChild
						variant={'default'}
					>
						<Link
							href={'/agents/new-agent'}
							className='shrink-0 whitespace-nowrap'
						>
							<div className='mr-2 h-4 w-4 shrink-0'>
								{addIcon}
							</div>
							Add New Agent
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
							All Agents
						</TabsTrigger>
						<TabsTrigger value='active'>Active</TabsTrigger>
						<TabsTrigger value='inactive'>
							Inactive
						</TabsTrigger>
						<TabsTrigger value='blacklisted'>
							Blacklisted
						</TabsTrigger>
					</TabsList>
					<TabsContent value='all'>
						<DataTable
							showSearch
							searchWith='name'
							searchWithPlaceholder='Search with name'
							showColumns
							showPagination
							columns={agentsColumns}
							data={agents || []}
						/>
					</TabsContent>
					<TabsContent value='active'>
						<DataTable
							showSearch
							searchWith='name'
							searchWithPlaceholder='Search with name'
							showColumns
							showPagination
							columns={agentsColumns}
							data={
								agents?.filter(
									(agent) => agent.is_active === true
								) || []
							}
						/>
					</TabsContent>
					<TabsContent value='inactive'>
						<DataTable
							showSearch
							searchWith='name'
							searchWithPlaceholder='Search with name'
							showColumns
							showPagination
							columns={agentsColumns}
							data={
								agents?.filter(
									(agent) =>
										agent.is_active === false
								) || []
							}
						/>
					</TabsContent>
					<TabsContent value='blacklisted'>
						<DataTable
							showSearch
							searchWith='name'
							searchWithPlaceholder='Search with name'
							showColumns
							showPagination
							columns={agentsColumns}
							data={
								agents?.filter(
									(agent) =>
										agent.blacklisted === true
								) || []
							}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
