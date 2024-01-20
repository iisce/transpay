import SearchVehicle from '@/components/pages/vehicle/search-vehicle';
import React from 'react';

export default function StatusPage({ params }: { params: { bcid: string } }) {
	return (
		<div className='w-full'>
			<SearchVehicle id={params.bcid} />
		</div>
	);
}
