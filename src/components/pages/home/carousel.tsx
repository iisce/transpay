'use client';
import { useEffect, useState } from 'react';
import CarouselCard from './carousel-card';

const images = [
	{
		src: 'https://via.placeholder.com/600x300?text=Image+1',
		altText: 'Slide 1',
	},
	{
		src: 'https://via.placeholder.com/600x300?text=Image+2',
		altText: 'Slide 2',
	},
	{
		src: 'https://via.placeholder.com/600x300?text=Image+3',
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
					// image={item.src}
					isActive={index === activeIndex}
				/>
			))}
		</>
	);
}
