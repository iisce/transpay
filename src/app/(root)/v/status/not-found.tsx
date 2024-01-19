'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VehiclesPageNotFound() {
	const router = useRouter();
	return (
		<div className='grid place-items-center w-full'>
			<div className='flex flex-col items-center justify-center text-center'>
				<h2>Sticker Not Attatched To A Vehicle</h2>
				<Button
					asChild
					variant='link'
				>
					<Link href='/'>Go to Dashboard</Link>
				</Button>
			</div>
		</div>
	);
}
