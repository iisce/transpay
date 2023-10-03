import React from 'react';
import DashboardAdmin from '@/components/role/admin/dashboard';
import DashboardSuperAdmin from '@/components/role/super-admin/dashboard';
import DashboardAgent from '@/components/role/agent/dashboard';
import { getSSession } from '@/lib/get-data';
import { notFound } from 'next/navigation';
import { getAgentMe } from '@/lib/controllers/agent-controller';
import { getAdminMe } from '@/lib/controllers/admin-controller';

export default async function DashboardPage() {
	const { role } = await getSSession();
	const user =
		role?.toLowerCase() === 'agent'
			? await getAgentMe()
			: await getAdminMe();

	if (!user) return notFound();
	else
		return (
			<div className='w-full p-3 md:p-5 flex flex-col gap-5'>
				<div className=' text-title2Bold md:text-h5Bold'>
					Welcome Back, {user.name}
				</div>
				<div className='w-full'>
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
