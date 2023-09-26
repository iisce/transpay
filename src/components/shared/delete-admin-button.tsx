'use client';
import { deleteIcon, loadingSpinner } from '@/lib/icons';
import React from 'react';
import { useToast } from '../ui/use-toast';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';

export default function DeleteAdminButton({ id }: { id: string }) {
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const handleDelete = async (id: string) => {
		setIsLoading(true);
		try {
			const createAdminResponse = await fetch('/api/create-admin', {
				method: 'DELETE',
				body: JSON.stringify({
					admin_id: id,
				}),
			});
			const result = await createAdminResponse.json();
			if (
				createAdminResponse.status > 199 &&
				createAdminResponse.status < 299
			) {
				toast({
					title: 'Updated Successfully',
				});
				setIsLoading(false);
				router.push(`/admins`);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				console.log('Something went wrong');
				toast({
					title: 'Not Updated',
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
