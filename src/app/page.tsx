import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { options } from './api/auth/options';
import SignOutBtn from './(auth)/_components/sign-out-button';

export default async function Home() {
	const session = await getServerSession(options);
	return (
		<main className='flex gap-5 min-h-screen flex-col items-center justify-start py-12 sm:p-32 overflow-y-scroll'>
			<div className='text-h4 text-primary font-bold uppercase'>
				Transpay
			</div>
			<div className='grid gap-3 uppercase w-full max-w-sm p-5'>
				{session ? (
					<SignOutBtn />
				) : (
					<>
						<Button asChild>
							<Link
								className='w-full'
								href={'/admin/sign-in'}
							>
								Admin Sign In
							</Link>
						</Button>
						<Button asChild>
							<Link
								className='w-full'
								href={'/agent/sign-in'}
							>
								Agent Sign In
							</Link>
						</Button>
					</>
				)}
				<Button asChild>
					<Link
						className='w-full'
						href={'/dashboard'}
					>
						Dashboard
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/admins'}
					>
						Admin
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/agents'}
					>
						Agents
					</Link>
				</Button>

				<Button asChild>
					<Link
						className='w-full'
						href={'/scan'}
					>
						Scan
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/search'}
					>
						Search Vehicle
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/manage'}
					>
						Manage Account
					</Link>
				</Button>
			</div>
		</main>
	);
}
