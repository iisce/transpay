import { Button } from '@/components/ui/button';
import { DRIVER_TABLE } from '@/lib/consts';
import { addIcon, successIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';

export default function Waiver({ params }: { params: { plate: string } }) {
	const vehicle = DRIVER_TABLE.find(
		(driver) => driver.plate === params.plate
	);
	return (
		<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 '>
			<div className='flex justify-between'>
				<div className=''>
					<h1 className=' text-title1Bold py-2 '>
						Waiver for {vehicle?.plate.toUpperCase()}
					</h1>
					<p className=' text-title2Bold pb-3'>
						Vehicle Waiver History
					</p>
				</div>
				<Button
					className='justify-start rounded-xl'
					asChild
					variant={'default'}
				>
					<Link
						href={`waiver/add-new`}
						className='shrink-0 whitespace-nowrap'
					>
						<div className='mr-2 h-4 w-4 shrink-0'>
							{addIcon}
						</div>
						Add New Waiver
					</Link>
				</Button>
			</div>

			<div className='flex flex-col p-3 w-full items-center gap-2 mb-20'>
				<div className=' text-green-600'>{successIcon}</div>
				<div className='flex py-2'>
					<div className='shrink-0 grow-0 text-title1Bold'>
						Vehicle is on waiver period
					</div>
				</div>
				<Button asChild>
					<Link
						href={'waiver/history'}
						className='uppercase'
					>
						View Waiver History
					</Link>
				</Button>
			</div>
		</div>
	);
}
