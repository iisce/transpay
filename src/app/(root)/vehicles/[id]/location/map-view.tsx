'use client';
import { generateRandomLocation } from '@/lib/utils';
import {
	APIProvider,
	AdvancedMarker,
	InfoWindow,
	Map,
	Marker,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

export default function MapView({ vehicle }: { vehicle?: IVehicleSummary }) {
	const LOCATION_MAPS = generateRandomLocation();
	const [position, setPosition] =
		useState<google.maps.LatLngLiteral>(LOCATION_MAPS);
	const [markerRef, marker] = useAdvancedMarkerRef();
	const [infowindowOpen, setInfowindowOpen] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			const speed = 0.0001;
			const randomDirection = Math.random() * 1;
			const lat = position.lat + speed * Math.cos(randomDirection);
			const lng = position.lng + speed * Math.sin(randomDirection);

			setPosition({ lat, lng });
		}, 1000);

		return () => clearInterval(interval);
	});
	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
			<Map
				className='w-full rounded-2xl overflow-clip border h-[90svh]'
				zoom={15.5}
				center={position}
				gestureHandling={'greedy'}
				onClick={() => setInfowindowOpen(true)}
				mapId={'YUTGTGT'}
				// disableDefaultUI={true}
			>
				<AdvancedMarker
					ref={markerRef}
					// onClick={() => setInfowindowOpen(true)}
					position={position}
					title={
						'AdvancedMarker that opens an Infowindow when clicked.'
					}
				>
					<div className='text-2xl'>🚗</div>
				</AdvancedMarker>

				{infowindowOpen && (
					<InfoWindow
						anchor={marker}
						maxWidth={300}
						onCloseClick={() => setInfowindowOpen(false)}
					>
						<div className='px-2 flex flex-col'>
							<div className='flex justify-between gap-2'>
								<div className='font-bold'>
									Plate Number:
								</div>{' '}
								<div className=''>
									{vehicle?.plate_number}
								</div>
							</div>
							<div className='flex justify-between gap-2'>
								<div className='font-bold'>
									Vehicle Owner:
								</div>{' '}
								<div className=''>
									{vehicle?.owners_name}
								</div>
							</div>
							<div className='flex justify-between gap-2'>
								<div className='font-bold'>
									Category:
								</div>{' '}
								<div className='uppercase'>
									{vehicle?.category
										.split('_')
										.join(' ')}
								</div>
							</div>
						</div>
					</InfoWindow>
				)}
			</Map>
		</APIProvider>
	);
}
