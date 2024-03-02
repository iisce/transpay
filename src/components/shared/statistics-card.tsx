import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { dashIcon, downIcon, upIcon } from '@/lib/icons';

export default function StatsCard({
	children,
	title,
	amount,
	type,
	percentage,
	desc,
}: {
	children: React.ReactNode;
	title: string;
	amount: string;
	type?: 'up' | 'down' | '';
	percentage: string | number;
	desc?: string;
}) {
	return (
		<div className='p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
			<Card className=' overflow-hidden p-5 shadow-md hover:shadow-xl transition-all'>
				<div className='mb-5'>
					<div className=''>{title}</div>
					<div className='text-xs'>{desc}</div>
					<div className='flex gap-2'>
						<div className='flex text-lg font-bold'>
							{amount}
						</div>
						<Badge
							variant={
								type === 'up'
									? 'awesome'
									: type === 'down'
									? 'destructive'
									: 'default'
							}
							className='gap-1'
						>
							<div className='h-2.5 w-2.5'>
								{type === 'up'
									? upIcon
									: type === 'down'
									? downIcon
									: dashIcon}
							</div>
							{`${percentage}%`}
						</Badge>
					</div>
				</div>
				<div className='w-full h-[130px] object-cover'>
					{children}
				</div>
			</Card>
		</div>
	);
}
