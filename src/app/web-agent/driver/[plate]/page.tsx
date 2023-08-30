import WebAgentViewDriverDetails from '@/components/pages/webagent-driver/viewdriver';
import React from 'react';

export default function DriverPage({ params }: { params: { plate: string } }) {
	return (
		<div>
			<WebAgentViewDriverDetails plate={params.plate} />
		</div>
	);
}
