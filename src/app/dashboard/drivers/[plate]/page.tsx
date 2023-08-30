import ViewDriverDetails from '@/components/pages/drives/view-driver-details';
import React from 'react';

export default function DriverPage({ params }: { params: { plate: string } }) {
	return (
		<div className='w-full'>
			<ViewDriverDetails plate={params.plate} />
		</div>
	);
}
