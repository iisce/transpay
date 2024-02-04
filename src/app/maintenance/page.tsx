import NavBar from '@/components/layout/navbar';
import Jap from '@/components/shared/json-animation-player';
import { Button, buttonVariants } from '@/components/ui/button';
import { WhatsAppIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { FacebookIcon, InstagramIcon, MailIcon, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MaintenancePage() {
	return (
		<>
			<div className='h-[100svh] grid place-items-center p-4 w-full max-w-2xl mx-auto text-center'>
				<div className='flex flex-col items-center justify-center'>
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
					<h1 className='text-2xl font-bold mb-8'>
						System Update in Progress!
					</h1>
					<div className='mb-5'>
						{`Our system is currently undergoing updates to elevate your TransPay experience. As a result, access to the TransPay platform is momentarily paused.`}
					</div>
					<h2 className='text-xl font-bold'>{`What's Happening`}</h2>
					<ol className='text-start mb-5'>
						<li>
							<span className='font-bold'>
								Enhancements Underway:{' '}
							</span>
							<span>
								{` We're making improvements behind the scenes for a seamless experience.`}
							</span>{' '}
						</li>
						<li>
							<span className='font-bold'>
								Estimated Downtime:{' '}
							</span>
							<span>
								{`We're working diligently and anticipate completing the updates shortly. Thank you for your patience.`}
							</span>{' '}
						</li>
					</ol>
					<h2 className='text-xl font-bold'>What You Can Do</h2>
					<ol className='text-start mb-5'>
						<li>
							<span className='font-bold'>
								Stay Curious:{' '}
							</span>
							<span>
								{`Exciting changes are in the works. We'll be back online soon.`}
							</span>{' '}
						</li>
					</ol>
					<h2 className='text-xl font-bold mb-3'>
						Need Assistance?
					</h2>
					<div className='flex items-center justify-center flex-wrap gap-2 mb-5'>
						<a
							href={'sms:+2348163453826'}
							className={cn(buttonVariants(), 'gap-2')}
						>
							<MailIcon /> SMS
						</a>
						<a
							href={'tel:+2348163453826'}
							className={cn(buttonVariants(), 'gap-2')}
						>
							<PhoneCall /> Call
						</a>
						<a
							href={'whatsapp://send?phone=2348163453826'}
							className={cn(buttonVariants(), 'gap-2')}
						>
							<WhatsAppIcon /> WhatsApp
						</a>
					</div>
					<div className=''>
						We appreciate your cooperation as we work to make
						your TransPay experience even better!
					</div>
				</div>
			</div>
		</>
	);
}
