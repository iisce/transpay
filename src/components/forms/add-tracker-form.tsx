'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import React from 'react';
import { loadingSpinner } from '@/lib/icons';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';

const vehicleTrackerFormSchema = z.object({
	tracker_id: z.string({ required_error: '' }),
});

type VehicleFormValues = z.infer<typeof vehicleTrackerFormSchema>;

export function AddTrackerForm({ vehicle }: { vehicle: IVehicleSummary }) {
	const router = useRouter();
	const hasTracker =
		vehicle.tracker.terminal_id !== null ||
		vehicle.tracker.terminal_id === '';
	hasTracker &&
		router.push(`/green-engine/${vehicle.plate_number.toLowerCase()}`);
	const defaultValues: Partial<VehicleFormValues> = {
		tracker_id: vehicle.tracker.terminal_id,
	};
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { toast } = useToast();
	const form = useForm<VehicleFormValues>({
		resolver: zodResolver(vehicleTrackerFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	async function onSubmit(data: VehicleFormValues) {
		setIsLoading(true);
		try {
			const addTrackerResponse = await fetch('/api/add-tracker', {
				method: 'PUT',
				body: JSON.stringify({
					tracker_id: data.tracker_id,
					vehicle_id: vehicle.id,
				}),
			});
			const result = await addTrackerResponse.json();
			if (
				addTrackerResponse.status > 199 &&
				addTrackerResponse.status < 299
			) {
				toast({
					title: 'Vehicle Updated Successfully',
				});
				setIsLoading(false);
				router.push(
					`/green-engine/${vehicle.plate_number.toLowerCase()}`
				);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'Vehicle NOT Created',
				});
				return null;
			}
		} catch (error) {
			setIsLoading(false);
		}
	}

	return (
		<div className='my-5 w-full p-5'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-5 w-full'
				>
					<div className=''>
						<FormField
							name='tracker_id'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											type='text'
											placeholder='Enter Tracker  ID'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						className='w-full'
						type='submit'
					>
						{isLoading ? loadingSpinner : 'Add Tracker'}
					</Button>
				</form>
			</Form>
		</div>
	);
}
