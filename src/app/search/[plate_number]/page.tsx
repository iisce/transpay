import SearchVehicle from '@/components/pages/vehicle/search-vehicle';
import NoLoginSearch from '@/components/role/rider/no-login-search';
import React from 'react';

export default function SearchPage({
	params,
}: {
	params: { plate_number: string };
}) {
	return (
		<div className='w-full'>
			{/* <NoLoginSearch plate_number={params.plate_number} /> */}
			<SearchVehicle id={params.plate_number} />
		</div>
	);
}
