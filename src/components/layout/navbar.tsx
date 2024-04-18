import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { Notification } from '../shared/notification';
import { UserNav } from '../shared/user-nav-bar';
import { Button } from '../ui/button';
import { getUser } from '@/lib/controllers/users.controller';
import { redirect } from 'next/navigation';
import { options } from '@/app/api/auth/options';

export default async function NavBar() {
	const session = await getServerSession(options);
	if (!session) return redirect('/sign-in');
	const user = await getUser(session?.user.id!);

	const isAgent = session?.user.id === 'AGENT';
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
							{/* {!isAgent && <Notification />} */}
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
