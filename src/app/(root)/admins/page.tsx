import { PaginationISCE } from '@/components/shared/pagination-isce';
import { Button } from '@/components/ui/button';
import { adminsColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUsers } from '@/lib/controllers/users.controller';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';

export default async function Admins({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const page = searchParams['page'] ?? '1';
	const limit = searchParams['limit'] ?? '15';
	const admins = await getUsers({
		page,
		limit,
		blacklisted: false,
		type: 'admins',
	});

	const start = (Number(page) - 1) * Number(limit);
	const end = start + Number(limit);
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
							All Admins
						</TabsTrigger>
					</TabsList>
					<TabsContent value='all'>
						<DataTable
							showSearch
							searchWith='name'
							searchWithPlaceholder='Search with name'
							showColumns
							columns={adminsColumns}
							data={admins?.rows ?? []}
						/>
						{admins && admins.rows && (
							<PaginationISCE
								hasNextPage={end < admins.meta.total}
								hasPrevPage={start > 0}
								page={Number(page)}
								limit={Number(limit)}
								total={admins.meta.total}
								hrefPrefix='/admins'
							/>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
