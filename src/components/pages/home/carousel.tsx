'use client';
import { useEffect, useState } from 'react';
import CarouselCard from './carousel-card';

const images = [
	{
		src: '/slide-one.png',
		altText: 'Slide 1',
	},
	{
		src: '/slide-two.png',
		altText: 'Slide 2',
	},
	{
		src: '/slide-three.png',
		altText: 'Slide 3',
	},
];
export default function CarouselContainer() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000); // Change image every 3 seconds

		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			{images.map((item, index) => (
				<CarouselCard
					key={index}
					image={item.src}
					isActive={index === activeIndex}
				/>
			))}
		</>
	);
}
