import { options } from '@/app/api/auth/options';
import DashboardAdmin from '@/components/role/admin/dashboard';
import DashboardAgent from '@/components/role/agent/dashboard';
import DashboardGreen from '@/components/role/agent/green-dashboard';
import DashboardSuperAdmin from '@/components/role/super-admin/dashboard';
import { getUser } from '@/lib/controllers/users.controller';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
	const session = await getServerSession(options);
	const ROLE = session?.user.role;
	if (ROLE?.toLowerCase() === 'greenengine_agent') redirect('/green-engine');
	const user = await getUser(session?.user.id!);
	return (
		<div className='w-full p-3 md:p-5 flex flex-col gap-5'>
			<div className=' text-title2Bold md:text-h5Bold'>
				Welcome Back, {user?.name ?? 'User'}
			</div>
			<div className='w-full'>
				{ROLE?.toLowerCase() === 'superadmin' ? (
					<DashboardSuperAdmin />
				) : ROLE?.toLowerCase() === 'admin' ? (
					<DashboardAdmin />
				) : ROLE?.toLowerCase() === 'greenengine_agent' ? (
					<DashboardGreen />
				) : (
					<DashboardAgent />
				)}
			</div>
		</div>
	);
}
