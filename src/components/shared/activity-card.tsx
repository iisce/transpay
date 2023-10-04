import Link from 'next/link';
import React from 'react';

export default function ActivityCard({ id, name, time, date }: IActivities) {
	return (
		<Link
			href={`/activities/${id}`}
			className='grid hover:bg-primary-500/30 px-3 py-1 rounded-lg'
		>
			<div className=' truncate text-ellipsis text-sm'>{name}</div>
			<div className='flex text-xs justify-between'>
				<div className=''>{date}</div>
				<div className=''>{time}</div>
			</div>
		</Link>
	);
}
