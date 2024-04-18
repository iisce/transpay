'use client';
import { API } from '@/lib/consts';
import { getAllTrackerLocation } from '@/lib/controllers/tracker.controller';
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
import { io } from 'socket.io-client';

export default function MapView({
	vehicle,
	tracker,
}: {
	vehicle?: IVehicleSummary;
	tracker: IModifiedTrackerDetails;
}) {
	const LOCATION_MAPS = generateRandomLocation();
	const [position, setPosition] = useState<google.maps.LatLngLiteral>({
		lat: tracker?.lat,
		lng: tracker?.lon,
	});
	useEffect(() => {
		// Create a socket connection
		const socket = io('http://localhost:5000');

		socket.on('connect', function () {
			console.log('Connected to socket');

			socket.emit('stopTracking', {
				apiKey: '3vyqhmV0wUGLGSCoLwhKSQ1QfD8j6sFr',
			});
			socket.emit(
				'getTrackerLocation',
				{
					vehicleId: vehicle?.id,
					apiKey: '3vyqhmV0wUGLGSCoLwhKSQ1QfD8j6sFr',
				},
				(response: any) =>
					console.log('userLocation:', { response })
			);
		});

		// Listen for incoming tracker locations
		socket.on('location', (fullLocation: any) => {
			const locationData = JSON.parse(fullLocation);
			console.log('hello', { locationData });
			setPosition({
				lat: locationData.location.bdLat,
				lng: locationData.location.bdLon,
			});
		});

		// Clean up the socket connection on unmount
		return () => {
			socket.disconnect();
		};
	}, []);

	const [loading, setLoading] = useState<boolean>(false);
	const [markerRef, marker] = useAdvancedMarkerRef();
	const [infowindowOpen, setInfowindowOpen] = useState(true);

	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
			<Map
				className='w-full rounded-2xl overflow-clip border h-[85svh]'
				zoom={18}
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
									{vehicle?.owner.name}
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
