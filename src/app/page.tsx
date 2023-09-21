import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex gap-5 min-h-screen flex-col items-center justify-start py-12 sm:p-32 overflow-y-scroll'>
			<div className='text-h4 text-primary font-bold uppercase'>
				Transpay
			</div>
			<div className='grid gap-3 uppercase w-full max-w-sm p-5'>
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
						href={'/dashboard/admins'}
					>
						Admin
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/dashboard/agents'}
					>
						Agents
					</Link>
				</Button>
				<Button asChild>
					<Link
						className='w-full'
						href={'/sign-in'}
					>
						Sign In
					</Link>
				</Button>

				<Button asChild>
					<Link
						className='w-full'
						href={'/dashboard/scan'}
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
