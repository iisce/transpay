import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

export default function ViewAgentDetails() {
	const agentDetails = {
		name: 'Sample Name',
		moi: 'nin',
		phone: '08061719533',
		id: '22148971790',
		email: 'ap@example.com',
		address: '27, LetUsSee Street, Festac, Lagos, Nigeria',
	};
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
			<div className='flex flex-col w-full items-start gap-1.5'>
				<Label htmlFor='name'>Name</Label>
				<Input
					disabled
					type='name'
					id='name'
					value={agentDetails.name}
				/>
			</div>
			<div className='flex flex-col w-full items-start gap-1.5'>
				<Label htmlFor='moi'>Means of Identification</Label>
				<Select
					defaultValue={agentDetails.moi}
					disabled
				>
					<SelectTrigger className=''>
						<SelectValue placeholder='Select a fruit' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='nin'>NIN</SelectItem>
							<SelectItem value='bvn'>BVN</SelectItem>
							<SelectItem value='pvc'>
								Voters Card
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className='flex flex-col w-full items-start gap-1.5'>
				<Label htmlFor='phone'>Phone Number</Label>
				<Input
					disabled
					type='tel'
					id='phone'
					value={agentDetails.phone}
				/>
			</div>
			<div className='flex flex-col w-full items-start gap-1.5'>
				<Label htmlFor='id'>Identification Number</Label>
				<Input
					disabled
					type='text'
					id='id'
					value={agentDetails.id}
				/>
			</div>
			<div className='flex flex-col w-full items-start gap-1.5'>
				<Label htmlFor='email'>Email Address</Label>
				<Input
					disabled
					type='email'
					id='email'
					value={agentDetails.email}
				/>
			</div>
			<div className='grid w-full gap-1.5'>
				<Label htmlFor='address'>Address</Label>
				<Textarea
					disabled
					value={agentDetails.address}
					id='address'
				/>
			</div>
		</div>
	);
}
