import WebAgentViewDriverDetails from '@/components/pages/webagent-driver/viewdriver';
import React from 'react';

export default function DriverPage({ params }: { params: { plate: string } }) {
	console.log(params);
	return (
		<div>
			<WebAgentViewDriverDetails plate={params.plate} />
		</div>
	);
}
