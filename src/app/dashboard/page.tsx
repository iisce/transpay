import React from 'react';
import { USER } from '../../../data';
import DashboardAdmin from '@/components/role/admin/dashboard';
import DashboardSuperAdmin from '@/components/role/superadmin/dashboard';

export default function DashboardPage() {
	return (
		<div className='h-full p-3 sm:p-5 flex flex-col gap-5 overflow-y-scroll w-full'>
			<div className=' text-title1Bold sm:text-h4Bold'>
				Welcome Back, {USER.user.name}
			</div>
			<div className=''>
				{USER.user.role === 'super admin' ? (
					<DashboardSuperAdmin user={USER.user} />
				) : (
					<DashboardAdmin user={USER.user} />
				)}
			</div>
		</div>
	);
}
