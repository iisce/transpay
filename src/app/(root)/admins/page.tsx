import { Button } from '@/components/ui/button';
import { adminsColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAdmins } from '@/lib/controllers/admin-controller';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';

export default async function Admins() {
	const admins = await getAdmins();
	return (
		<div className='p-5 w-full h-full flex flex-col'>
			<div className='flex justify-between items-center uppercase font-bold'>
				<div className='shrink-0 grow-0'>Admins</div>
				<div className='shrink-0 grow-0'>
					<Button
						className='justify-start text-white rounded-xl bg-primary-800'
						asChild
						variant={'default'}
					>
						<Link
							href={'/admins/new-admin'}
							className='shrink-0 whitespace-nowrap'
						>
							<div className='mr-2 h-4 w-4 shrink-0'>
								{addIcon}
							</div>
							New Admin
						</Link>
					</Button>
				</div>
			</div>
			<div className='flex flex-col gap-5'>
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
							searchWith='name'
							searchWithPlaceholder='Search with name'
							showColumns
							showPagination
							columns={adminsColumns}
							data={admins || []}
						/>
					</TabsContent>
					<TabsContent value='active'>
						<DataTable
							showSearch
							searchWith='name'
							searchWithPlaceholder='Search with name'
							showColumns
							columns={adminsColumns}
							data={
								admins?.filter(
									(admin) =>
										admin.blacklisted === false
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
							columns={adminsColumns}
							data={
								admins?.filter(
									(admin) =>
										admin.blacklisted === true
								) || []
							}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
