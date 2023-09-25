import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
	return (
		<section className='max-w-lg mx-auto flex gap-10 flex-col items-center justify-center h-screen'>
			<div className='h-10'>
				<Image
					className='object-contain h-full w-full dark:invert'
					src={'/vercel.svg'}
					alt=''
					width={400}
					height={400}
				/>
			</div>
			<div className='flex flex-col gap-5'>
				<h3 className='uppercase text-center'>
					You have found a rare gem!.
				</h3>
				<span className='text-center'>
					But sadly, its of no use to you, please go back.
				</span>
				<div className='flex flex-col gap-3 uppercase'>
					<Button asChild>
						<Link
							className=''
							href={'/dashboard'}
						>
							Go To Dashboard
						</Link>
					</Button>
					<Button asChild>
						<Link
							className=''
							href={'/'}
						>
							Create an Account
						</Link>
					</Button>
					<Button asChild>
						<Link
							className=''
							href={'/faqs'}
						>
							Faqs
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
