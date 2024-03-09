import { PaginationISCE } from '@/components/shared/pagination-isce';
import AgentSearchBar from '@/components/ui/agent-search-bar';
import { vehiclesColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getVehicles } from '@/lib/controllers/vehicle-controller';
import { getSSession } from '@/lib/get-data';

export default async function Vehicles({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const page = searchParams['page'] ?? '1';
	const limit = searchParams['limit'] ?? '15';

	const [session, vehicles] = await Promise.all([
		getSSession(),
		getVehicles(page, limit),
	]);

	const start = (Number(page) - 1) * Number(limit);
	const end = start + Number(limit);
	return (
		<>
			<div className='inline-flex h-10 items-end justify-start text-muted-foreground w-full bg-background border-b border-primary'>
				<div className='inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 border-primary data-[state=active]:text-foreground data-[state=active]:shadow-sm'>
					All Vehicles
				</div>
			</div>
			{vehicles && session?.role?.toLowerCase() !== 'agent' ? (
				<>
					<div className='flex flex-col gap-5 mb-10'>
						<DataTable
							showSearch
							searchWith='plate_number'
							searchWithPlaceholder='Search with plate number'
							showColumns
							columns={vehiclesColumns}
							data={vehicles.vehicles}
						/>
					</div>
					<PaginationISCE
						hasNextPage={end < vehicles.total}
						hasPrevPage={start > 0}
						page={vehicles.page}
						limit={vehicles.limit}
						total={vehicles.total}
						hrefPrefix='/vehicles'
					/>
				</>
			) : (
				<div className='max-w-[500px] w-full h-full mx-auto grid place-items-center mt-10'>
					<AgentSearchBar
						placeholder='Enter vehicle plate'
						variant='primary'
					/>
				</div>
			)}
		</>
	);
}
