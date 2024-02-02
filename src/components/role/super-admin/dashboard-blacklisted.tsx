import { adminsColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getDashboard } from '@/lib/get-data';
import React from 'react';

export default async function DashboardBlacklisted() {
	const dashboardDetails = await getDashboard('1Y');
	const blackListed = dashboardDetails?.data.admins.blacklisted || [];
	return (
		blackListed.length > 0 && (
			<div className='w-full bg-secondary rounded-xl p-3 md:p-5'>
				<div className='text-2xl mb-2 px-4'>Blacklisted Admin</div>
				<DataTable
					showPagination={false}
					columns={adminsColumns}
					data={blackListed?.slice(0, 4) || []}
				/>
			</div>
		)
	);
}
