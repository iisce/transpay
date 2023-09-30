'use client';
import React from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useToast } from '../ui/use-toast';
import { loadingSpinner, successIcon } from '@/lib/icons';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
} from '../ui/alert-dialog';
import { NextResponse } from 'next/server';
import { BUS_IMAGE_SAMPLE } from '@/lib/consts';

const vehicleFormSchema = z.object({
	category: z
		.string({
			required_error: 'Please enter a valid Category.',
		})
		.refine((value) => ['keke', 'bus'].includes(value), {
			message: 'Invalid means of identification.',
		}),
	vehicle_type: z.string({
		required_error: 'Please enter a valid vehicle type.',
	}),
	color: z
		.string({
			required_error: 'Please enter a valid Color.',
		})
		.min(3, { message: 'Colors have at least three characters.' }),
	image: z
		.string({
			required_error: 'Please add image.',
		})
		.min(5, { message: 'Must be a valid Image link' }),
	plate_number: z
		.string({
			required_error: 'Enter your plate number.',
		})
		.min(5, {
			message: 'Plate numbers have at least five(5) characters.',
		}),
	owners_phone_number: z
		.string({
			required_error: 'Enter owner phone number.',
		})
		.min(9, {
			message: 'Phone numbers have at least nine(9) characters.',
		})
		.max(15, {
			message: 'Phone numbers have at most (15) characters.',
		}),
	owners_name: z
		.string({
			required_error: 'Enter owner phone number.',
		})
		.min(5, {
			message: 'Plate numbers have at least five(5) characters.',
		}),
	vin: z
		.string({
			required_error: 'Enter your VIN.',
		})
		.min(5, {
			message: 'VIN have at least five(5) characters.',
		}),
	status: z.string({
		required_error: 'Choose Status',
	}),
	barcode_string: z.string(),
	tracker_id: z.string(),
});

type DriverFormValues = z.infer<typeof vehicleFormSchema>;

const defaultValues: Partial<DriverFormValues> = {
	category: 'bus',
	color: '',
	image: BUS_IMAGE_SAMPLE,
	plate_number: '',
	status: 'active',
	vehicle_type: '',
	vin: '',
	barcode_string: '',
	tracker_id: '',
	owners_phone_number: '',
	owners_name: '',
};

export default function CreateVehicleForm() {
	const [newVehicleId, setNewVehicleId] = React.useState<string>('');
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const form = useForm<DriverFormValues>({
		resolver: zodResolver(vehicleFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	const onSubmit = async (data: DriverFormValues) => {
		setIsLoading(true);
		try {
			const createVehicleResponse = await fetch(
				'/api/create-vehicle',
				{
					method: 'POST',
					body: JSON.stringify({
						category: data.category,
						color: data.color,
						image: data.image,
						plate_number: data.plate_number,
						status: data.status,
						vehicle_type: data.vehicle_type,
						vin: data.vin,
						barcode_string: data.barcode_string,
						tracker_id: data.tracker_id,
						owners_phone_number: data.owners_phone_number,
						owners_name: data.owners_name,
					}),
				}
			);
			const result = await createVehicleResponse.json();
			if (
				createVehicleResponse.status > 199 &&
				createVehicleResponse.status < 299
			) {
				toast({
					title: 'Vehicle Created Successfully',
				});
				setIsLoading(false);
				setOpen(true);
				setNewVehicleId(result.data.vehicle_id);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'Vehicle NOT Created',
				});
				return NextResponse.json(result);
			}
		} catch (error) {
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4 '
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Vehicle Category
								</FormLabel>

								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='relative text-body flex  items-center h-14 rounded-2xl'>
											<SelectValue placeholder='Select a vehicle category' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='keke'>
											Keke
										</SelectItem>
										<SelectItem value='bus'>
											Bus
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='color'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Color
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Enter vehicle color'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='vehicle_type'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Vehicle Type
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Enter vehicle type'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='plate_number'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Plate Number
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Plate Number'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='vin'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									VIN
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Enter VIN'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='owners_name'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									{`Owner's Name`}
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder={`Enter owner's name`}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name='owners_phone_number'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									{`Owner's Phone Number`}
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder={`Enter owner's phone number`}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 
					<FormField
						name='barcode_string'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Barcode String
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Barcode String'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> 
					<FormField
						name='tracker_id'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Tracker ID
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Tracker ID'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> 
					*/}
				</div>
				<div className='flex justify-center items-center gap-6 text-title1Bold'>
					<Button
						variant={'outline'}
						size='lg'
						type='button'
						asChild
						className='p-4 py-2 rounded-normal w-28 '
					>
						<Link href={'/vehicles'}>Back</Link>
					</Button>
					<Button
						variant='default'
						size='lg'
						type='submit'
						className='p-4 py-2 rounded-normal w-28'
					>
						{isLoading ? loadingSpinner : 'Add Vehicle'}
					</Button>
				</div>
			</form>
			<AlertDialog
				open={open}
				onOpenChange={setOpen}
			>
				<AlertDialogContent className='bg-secondary'>
					<div className='w-60 mx-auto flex-col'>
						<div className='flex flex-col items-center gap-5 mb-5'>
							<div className='h-20 w-20 text-awesome-foreground'>
								{successIcon}
							</div>
							<div className='text-xl'>
								Agent Account Created
							</div>
						</div>
						<div className='flex flex-col text-left whitespace-nowrap  mb-5'>
							<div className=''>
								Category: {form.getValues().category}
							</div>
							<div className=''>
								Plate Number:{' '}
								{form.getValues().plate_number}
							</div>
							<div className=''>
								Color: {form.getValues().color}
							</div>
						</div>
						<div className='flex flex-col gap-3'>
							<AlertDialogAction
								asChild
								className='rounded-xl'
							>
								<Link
									href={`/vehicles/${newVehicleId}/new-driver`}
								>
									Add Driver
								</Link>
							</AlertDialogAction>
						</div>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</Form>
	);
}
