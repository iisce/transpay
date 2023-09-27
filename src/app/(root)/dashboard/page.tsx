import React from 'react';
import DashboardAdmin from '@/components/role/admin/dashboard';
import DashboardSuperAdmin from '@/components/role/super-admin/dashboard';
import DashboardAgent from '@/components/role/agent/dashboard';
import { getSSession, getUserMe } from '@/lib/get-data';
import { notFound } from 'next/navigation';
import { getAgentMe } from '@/lib/controllers/agent-controller';
import { getAdminMe } from '@/lib/controllers/admin-controller';

export default async function DashboardPage() {
	const { role } = await getSSession();
	console.log(role);
	const user =
		role?.toLowerCase() === 'agent'
			? await getAgentMe()
			: await getAdminMe();

	// const role = user?.role.toLowerCase();
	// console.log(user);
	if (!user) return notFound();
	else
		return (
			<div className='h-full p-3 sm:p-5 flex flex-col gap-5 overflow-y-scroll'>
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
