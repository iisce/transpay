import { AgentForm } from '@/components/forms/agents-registration-form';
import React from 'react';

export default function AddNewAgent() {
	return (
		<div className='p-5 gap-5 w-full h-full flex flex-col '>
			<div className='flex justify-between'>
				<div className='px-2'>
					<h3 className='text-lg font-medium'>Add New Agent</h3>
					<p className='text-sm text-muted-foreground'>
						Fill in agent details
					</p>
				</div>
			</div>
			<div className='flex flex-col gap-5 overflow-y-scroll px-2'>
				<AgentForm />
			</div>
		</div>
	);
}
