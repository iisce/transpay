'use client';
import { deleteIcon, loadingSpinner } from '@/lib/icons';
import React from 'react';
import { useToast } from '../ui/use-toast';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';

export default function DeleteAgentButton({ id }: { id: string }) {
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const handleDelete = async (id: string) => {
		setIsLoading(true);
		try {
			const createAgentResponse = await fetch('/api/create-agent', {
				method: 'DELETE',
				body: JSON.stringify({
					agent_id: id,
				}),
			});
			const result = await createAgentResponse.json();
			if (
				createAgentResponse.status > 199 &&
				createAgentResponse.status < 299
			) {
				toast({
					title: 'Updated Successfully',
				});
				setIsLoading(false);
				router.push(`/agents`);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'Not Updated',
					description: 'Something went wrong',
				});
				return null;
			}
		} catch (error) {
			setIsLoading(false);
		}
	};
	return (
		<div
			className='items-center cursor-pointer'
			onClick={() => handleDelete(id)}
		>
			<span className='h-4 w-4'>
				{isLoading ? (
					<div className='h-4 w-4 object-contain'>
						{loadingSpinner}
					</div>
				) : (
					deleteIcon
				)}
			</span>
		</div>
	);
}
