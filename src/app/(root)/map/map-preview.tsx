'use client';

import { ALL_IMEIS } from '@/lib/consts';
import { useTrackerLocations } from '@/lib/controllers/tracker.controller';
import { useQuery } from '@tanstack/react-query';
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';
import React, { useState } from 'react';

export default function MapPreview({
	trackers,
}: {
	trackers: IModifiedTrackerDetails[];
}) {
	const [imei, setImei] = useState<string[]>(ALL_IMEIS); // Manage your 'imei' state

	// const { isLoading, error, data } = useTrackerLocations(imei);
	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
			<Map
				className='w-full h-[100svh] overflow-clip '
				zoom={15}
				center={{
					lat: trackers[0].lat,
					lng: trackers[0].lon,
				}}
				gestureHandling={'greedy'}
				mapId={'YUTGTGT'}
				// disableDefaultUI={true}
			>
				{trackers.map((a, b) => (
					<AdvancedMarker
						key={b}
						// ref={markerRef}
						// onClick={() => setInfowindowOpen(true)}
						position={{
							lat: a.lat,
							lng: a.lon,
						}}
						title={''}
					>
						<div className='text-4xl'>🚗</div>
					</AdvancedMarker>
				))}
			</Map>
		</APIProvider>
	);
}
