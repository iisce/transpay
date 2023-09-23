import React from 'react';
import { USER } from '../../../../data';
import DashboardAdmin from '@/components/role/admin/dashboard';
import DashboardSuperAdmin from '@/components/role/superadmin/dashboard';
import DashboardAgent from '@/components/role/agent/dashboard';
import { getDashboard } from '@/lib/get-data';

export default async function DashboardPage() {
	const dashboardData = await getDashboard();
	return (
		<div className='h-full p-3 sm:p-5 flex flex-col gap-5 overflow-y-scroll w-full'>
			<div className=' text-title1Bold sm:text-h4Bold'>
				Welcome Back, {USER.user.name}
			</div>
			<div className=''>
				{USER.user.role === 'super-admin' ? (
					<DashboardSuperAdmin user={USER.user} />
				) : USER.user.role === 'admin' ? (
					<DashboardAdmin user={USER.user} />
				) : (
					<DashboardAgent user={USER.user} />
				)}
			</div>
		</div>
	);
}
