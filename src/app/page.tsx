import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import CarouselContainer from '@/components/pages/home/carousel';
import CarouselCard from '@/components/pages/home/carousel-card';
import { UserNav } from '@/components/shared/user-nav-bar';
import { Button } from '@/components/ui/button';
import Searchbar from '@/components/ui/searchbar';
import { BUS_IMAGE_SAMPLE } from '@/lib/consts';
import { getAdminMe } from '@/lib/controllers/admin-controller';
import { getAgentMe } from '@/lib/controllers/agent-controller';
import { getSSession } from '@/lib/get-data';
import { NigeriaIcon } from '@/lib/icons';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
	const { role } = await getSSession();
	const user =
		role?.toLowerCase() === 'agent'
			? await getAgentMe()
			: await getAdminMe();
	return (
		<main className=''>
			<div className='h-20 w-full shrink-0 fixed bg-white/50 backdrop-blur z-50'>
				<MaxWidthWrapper className='flex items-center justify-between h-full w-full gap-1'>
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
					<div className='flex items-center h-full gap-3'>
						<Button
							asChild
							className='rounded-lg w-24 lg:w-32 bg-transparent'
							variant={'outline'}
						>
							<Link href={'/scan'}>Scan QR</Link>
						</Button>
						<div className='flex gap-3 items-center text-primary-700'>
							{user ? (
								<>
									<Button
										asChild
										className='rounded-lg w-24 lg:w-32'
									>
										<Link href={'/dashboard'}>
											Dashboard
										</Link>
									</Button>
									<UserNav user={user} />
								</>
							) : (
								<Button
									asChild
									className='rounded-lg w-24 lg:w-32'
								>
									<Link href='/sign-in'>Login</Link>
								</Button>
							)}
						</div>
					</div>
				</MaxWidthWrapper>
			</div>

			<div className='h-[100svh] flex flex-col items-start justify-between relative pt-24 gap-10'>
				<NigeriaIcon className='absolute top-0 w-[50svw] h-full object-contain ' />
				<div className='w-full max-w-lg lg:max-w-3xl mx-auto flex flex-col items-center px-5 lg:px-20 pt-5 gap-10 relative'>
					<div className='shrink-0 flex flex-col items-center gap-2 lg:gap-5'>
						<div className='flex flex-col items-center'>
							<div className='text-2xl lg:text-5xl font-bold'>
								Your All-In-One Solution;
							</div>
							<div className='text-2xl lg:text-5xl font-bold'>
								Streamline, Track and Pay.
							</div>
						</div>
						<p className='text-center text-sm'>
							Transpay is a smart app that helps manage
							fees from bus and keke drivers, making
							everything easy for administrators with tools
							to check info, register drivers, and handle
							payments.
						</p>
					</div>
					<Searchbar
						placeholder='Search Vehicle'
						variant='secondary'
					/>
				</div>
				<div className='w-full h-[50svh] relative flex gap-3'>
					<CarouselContainer />
				</div>
			</div>

			<div className='bg-secondary w-full shrink-0 relative '>
				<div className='w-full h-10 bg-primary/20 flex justify-between items-center px-3 lg:px-9 '>
					<div className=''>Anambra</div>
					<div className=''>Nigeria</div>
				</div>
				<div className='flex lg:flex-row items-center justify-between gap-1 px-5'>
					<div className='flex justify-between'>
						<Button
							asChild
							className='rounded'
							variant={'link'}
						>
							<Link href={'/about'}>About</Link>
						</Button>
						<Button
							asChild
							className='rounded'
							variant={'link'}
						>
							<Link href={'/faq'}>FAQ</Link>
						</Button>
					</div>
					<div className='text-sm hidden lg:flex'>
						Solution is here!!!
					</div>
					<div className='flex'>
						<Button
							asChild
							className='rounded'
							variant={'link'}
						>
							<Link href={'/privacy'}>Privacy</Link>
						</Button>
						<Button
							asChild
							className='rounded'
							variant={'link'}
						>
							<Link href={'/terms'}>Terms</Link>
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
