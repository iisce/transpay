import { BUS_IMAGE_SAMPLE } from '@/lib/consts';
import Image from 'next/image';
import React from 'react';

export default function CarouselCard({
	isActive = false,
	image = BUS_IMAGE_SAMPLE,
}: {
	isActive?: boolean;
	image?: string;
}) {
	return (
		<div
			className={`${
				isActive ? 'w-[80%] ' : 'w-[10%] '
			}  transition-all duration-1000 flex flex-col justify-end`}
		>
			<Image
				src={image}
				alt=''
				height={300}
				width={1200}
				className={`${
					isActive ? 'h-full' : 'h-[95%]'
				} rounded:xl md:rounded-2xl w-full object-cover object-top transition-all duration-1000`}
			/>
		</div>
	);
}
