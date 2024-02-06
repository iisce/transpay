import { getAdminMe } from '@/lib/controllers/admin-controller';
import { getAgentMe, getGreenAgent } from '@/lib/controllers/agent-controller';
import { getSSession } from '@/lib/get-data';
import Image from 'next/image';
import Link from 'next/link';
import { Notification } from '../shared/notification';
import { UserNav } from '../shared/user-nav-bar';
import { Button } from '../ui/button';
import { notFound } from 'next/navigation';

export default async function NavBar() {
	const { role } = await getSSession();
	const user =
		role?.toLowerCase() === 'agent'
			? await getAgentMe()
			: role?.toLowerCase() === 'greenengine_agent'
			? await getGreenAgent()
			: await getAdminMe();

	const isAgent =
		user?.role.toLowerCase() !== 'admin' ||
		user?.role.toLowerCase() !== 'superadmin';

	if (!user) return notFound();
	return (
		<div className='h-16 w-full bg-secondary/60 backdrop-blur-sm pr-5 shrink-0 fixed z-50 '>
			<div className='flex items-center justify-between h-full'>
				<Link
					href={'/'}
					className='w-52 shrink-0 px-5'
				>
					<Image
						src={'/logo.png'}
						height={30}
						width={150}
						className='shrink-0'
						alt='Transpay Logo'
					/>
				</Link>
				<div className='flex gap-3 items-center text-primary-700'>
					{user ? (
						<>
							{!isAgent && <Notification />}
							<UserNav user={user} />
						</>
					) : (
						<Button asChild>
							<Link href='/sign-in'>Login</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
