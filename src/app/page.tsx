import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SignOutBtn from './(auth)/_components/sign-out-button';
import { getSSession } from '@/lib/get-data';
import { getAgentMe } from '@/lib/controllers/agent-controller';
import { getAdminMe } from '@/lib/controllers/admin-controller';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

export default async function Home() {
	const { role } = await getSSession();
	const user =
		role?.toLowerCase() === 'agent'
			? await getAgentMe()
			: await getAdminMe();
	return (
		<main className='flex gap-5 min-h-screen items-center flex-col justify-start py-12'>
			<div className='text-h4 text-primary font-bold uppercase'>
				Transpay
			</div>
			<div className='grid gap-3 uppercase w-full max-w-sm p-5'>
				{role ? (
					<div className='grid gap-3'>
						<Avatar className='h-32 w-32 mx-auto border shadow-lg'>
							<AvatarImage
								src={
									user?.image ||
									'https://avatars.githubusercontent.com/u/62449713?v=4'
								}
								alt={user?.name || 'User Name'}
							/>
							<AvatarFallback>
								{getInitials(user?.name || 'User Name')}
							</AvatarFallback>
						</Avatar>
						<SignOutBtn />
					</div>
				) : (
					<>
						<Button asChild>
							<Link
								className='w-full'
								href={'/admin/sign-in'}
							>
								{`Admin Sign In`}
							</Link>
						</Button>
						<Button asChild>
							<Link
								className='w-full'
								href={'/agent/sign-in'}
							>
								{`Agent Sign In`}
							</Link>
						</Button>
					</>
				)}
				<Button asChild>
					<Link
						className='w-full'
						href={'/dashboard'}
					>
						{`Dashboard`}
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/admins'}
					>
						{`Admin`}
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/agents'}
					>
						{`Agents`}
					</Link>
				</Button>

				<Button asChild>
					<Link
						className='w-full'
						href={'/scan'}
					>
						{`Scan`}
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/search'}
					>
						{`Search Vehicle`}
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/manage'}
					>
						{`Manage Account`}
					</Link>
				</Button>
			</div>
		</main>
	);
}
