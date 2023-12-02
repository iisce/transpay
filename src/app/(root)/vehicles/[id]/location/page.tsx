'use client';
import { generateRandomInteger } from '@/lib/utils';
// import { generateRandomLocation } from '@/lib/utils';
// import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Image from 'next/image';
import React from 'react';

export default function LocationPage() {
	// const location = generateRandomLocation();
	const image = generateRandomInteger(1, 5);
	return (
		// <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
		// 	<div className='px-5 lg:px-10 flex flex-col'>
		// 		<div className=''>
		// 			Latitude: {location.lat}, Longitude: {location.lng}
		// 		</div>
		// 		<Map
		// 			zoom={9}
		// 			center={location}
		// 		></Map>
		// 	</div>
		// </APIProvider>
		<div className='px-5 lg:px-10'>
			<div className='rounded-2xl overflow-clip border aspect-video'>
				<Image
					src={`/maps/${image}.png`}
					className='w-full h-full '
					alt='map location'
					height={900}
					width={1600}
				/>
			</div>
		</div>
	);
}
