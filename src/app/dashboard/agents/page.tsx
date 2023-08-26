import { Button } from '@/components/ui/button';
import { agentsColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AGENT_TABLE } from '@/lib/consts';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';

export default function Agents() {
	return (
		<div className='p-5 w-full h-full flex flex-col'>
			<div className='flex justify-between'>
				<div className='shrink-0 grow-0'>Agent</div>
				<div className='shrink-0 grow-0'>
					<Button
						className='justify-start rounded-xl'
						asChild
						variant={'default'}
					>
						<Link
							href={'/dashboard/agents/add-new'}
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
					</TabsList>
					<TabsContent value='all'>
						<DataTable
							showSearch
							columns={agentsColumns}
							data={AGENT_TABLE}
						/>
					</TabsContent>
					<TabsContent value='active'>
						<DataTable
							showSearch
							columns={agentsColumns}
							data={AGENT_TABLE.filter(
								(agent) => agent.status === 'active'
							)}
						/>
					</TabsContent>
					<TabsContent value='inactive'>
						<DataTable
							showSearch
							columns={agentsColumns}
							data={AGENT_TABLE.filter(
								(agent) => agent.status === 'inactive'
							)}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
