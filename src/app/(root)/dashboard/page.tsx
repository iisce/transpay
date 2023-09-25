import React from 'react';
import DashboardAdmin from '@/components/role/admin/dashboard';
import DashboardSuperAdmin from '@/components/role/super-admin/dashboard';
import DashboardAgent from '@/components/role/agent/dashboard';
import { getUserMe } from '@/lib/get-data';
import { notFound } from 'next/navigation';

export default async function DashboardPage() {
	const user = await getUserMe();
	const role = user?.role.toLowerCase();
	if (!user) return notFound();
	else
		return (
			<div className='h-full p-3 sm:p-5 flex flex-col gap-5 overflow-y-scroll w-full'>
				<div className=' text-title1Bold sm:text-h4Bold'>
					Welcome Back, {user.name}
				</div>
				<div className=''>
					{role === 'superadmin' ? (
						<DashboardSuperAdmin user={user} />
					) : role === 'admin' ? (
						<DashboardAdmin user={user} />
					) : (
						<DashboardAgent user={user} />
					)}
				</div>
			</div>
		);
}
