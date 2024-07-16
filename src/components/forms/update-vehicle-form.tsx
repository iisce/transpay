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
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import React from 'react';
import { loadingSpinner } from '@/lib/icons';
import { NextResponse } from 'next/server';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { ArrowLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const vehicleFormSchema = z.object({
	category: z
		.string({
			required_error: 'Please enter a valid Category.',
		})
		.refine(
			(value) =>
				['KEKE', 'SMALL_SHUTTLE', 'BIG_SHUTTLE'].includes(value),
			{
				message: 'Invalid means of identification.',
			}
		),
	plate_number: z
		.string({
			required_error: 'Enter your plate number.',
		})
		.min(5, {
			message: 'Plate numbers have at least five(5) characters.',
		}),
	asin_number: z.string().optional(),
	t_code: z.string().optional(),
	color: z.string(),
	image: z
		.string({
			required_error: 'Please add image.',
		})
		.min(5, { message: 'Must be a valid Image link' }),
	status: z.string({
		required_error: 'Choose Status',
	}),
	type: z.string().optional(),
	vin: z.string(),
	barcode: z.string().optional(),
	tracker_id: z.string().optional(),
	owner_phone: z
		.string({
			required_error: 'Enter owner phone number.',
		})
		.regex(/^\+234[789][01]\d{8}$/, 'Phone format (+2348012345678)'),
	owner_name: z
		.string({
			required_error: 'Enter owner phone number.',
		})
		.min(5, {
			message: 'Enter full name',
		}),
	owner_address: z
		.string({
			required_error: 'Enter owner address.',
		})
		.min(5, {
			message: 'Enter full address',
		}),
	owner_gender: z.string().optional(),
	owner_marital_status: z.string().optional(),
	owner_whatsapp: z.string().optional(),
	owner_email: z.string().optional(),
	owner_valid_id: z.string().optional(),
	owner_nok_name: z.string().optional(),
	owner_nok_phone: z.string().optional(),
	owner_nok_relationship: z.string().optional(),
	id: z.string(),
	blacklisted: z.boolean().optional(),
});

export type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

export function UpdateVehicleForm({ vehicle }: { vehicle: IVehicle }) {
	const router = useRouter();
	const [disabled, setDisabled] = React.useState<boolean>(true);
	const defaultValues: Partial<VehicleFormValues> = {
		id: vehicle.id,
		category: vehicle.category,
		plate_number: vehicle.plate_number,
		asin_number: vehicle.asin_number,
		t_code: vehicle.t_code?.trim() !== '' ? vehicle.t_code : 'NULL',
		color: vehicle.color,
		image: vehicle.image,
		status: vehicle.status,
		type: vehicle.type ?? '',
		vin: vehicle.vin,
		barcode: vehicle.barcode ?? '',
		blacklisted: vehicle.blacklisted,
		tracker_id: vehicle?.tracker?.terminal_id ?? '',
		owner_name: vehicle.owner.name,
		owner_phone: vehicle.owner.phone,
		owner_address: vehicle.owner.address,
		owner_gender: vehicle.owner.gender,
		owner_marital_status: vehicle.owner.marital_status,
		owner_whatsapp: vehicle.owner.whatsapp,
		owner_email: vehicle.owner.email,
		owner_valid_id: vehicle.owner.valid_id,
		owner_nok_name: vehicle.owner.nok_name,
		owner_nok_phone: vehicle.owner.nok_phone,
		owner_nok_relationship: vehicle.owner.nok_relationship,
	};
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { toast } = useToast();
	const form = useForm<VehicleFormValues>({
		resolver: zodResolver(vehicleFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	async function onSubmit(data: VehicleFormValues) {
		setIsLoading(true);
		try {
			const createVehicleResponse = await fetch(
				'/api/create-vehicle',
				{
					method: 'PUT',
					body: JSON.stringify({
						id: data.id,
						category: data.category,
						plate_number: data.plate_number,
						asin_number:
							data.asin_number?.trim() !== ''
								? data.asin_number
								: 'NULL',
						t_code:
							data.t_code?.trim() !== ''
								? data.t_code
								: 'NULL',
						color: data.color,
						image: data.image,
						status: data.status,
						type: data.type,
						vin: data.vin,
						barcode: data.barcode,
						tracker_id: data.tracker_id,
						blacklisted: data.blacklisted,
						owner: {
							name: data.owner_name,
							phone: data.owner_phone,
							address: data.owner_address,
							gender: data.owner_gender,
							marital_status: data.owner_marital_status,
							whatsapp: data.owner_whatsapp,
							email: data.owner_email,
							valid_id: data.owner_valid_id,
							nok_name: data.owner_nok_name,
							nok_phone: data.owner_nok_phone,
							nok_relationship:
								data.owner_nok_relationship,
						},
					}),
				}
			);
			const result = await createVehicleResponse.json();
			if (createVehicleResponse.ok) {
				toast({
					title: 'Vehicle Updated Successfully',
				});
				setIsLoading(false);
				setDisabled(true);
				router.push('/vehicles?page=1&limit=15');
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
		<div className='mb-20'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-5 w-full'
				>
					<div className='h-12 shrink-0 bg-primary w-full rounded-2xl flex overflow-hidden text-white items-center'>
						<div className='h-12 w-12 bg-black p-3'>
							<Plus />
						</div>
						<div className='p-3'>VEHICLE INFORMATION</div>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						<FormField
							name='category'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										Vehicle Category
									</FormLabel>

									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={disabled}
									>
										<FormControl>
											<SelectTrigger className='relative text-body flex  items-center h-14 rounded-2xl'>
												<SelectValue placeholder='Select a vehicle category' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='KEKE'>
												Keke
											</SelectItem>
											<SelectItem value='SMALL_SHUTTLE'>
												Small Shuttle
											</SelectItem>
											<SelectItem value='BIG_SHUTTLE'>
												Big Shuttle
											</SelectItem>
										</SelectContent>
									</Select>
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
											disabled={disabled}
											type='text'
											placeholder='Plate Number'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='asin_number'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										ASIN Number
									</FormLabel>

									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											disabled={disabled}
											type='text'
											placeholder={`Enter ASIN number`}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='t_code'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										T-Code
									</FormLabel>

									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											disabled={disabled}
											type='text'
											placeholder='Enter T-Code'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='color'
							control={form.control}
							render={({ field }) => (
								<FormItem hidden>
									<FormLabel className='text-title1Bold pl-4'>
										Color
									</FormLabel>

									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											disabled={disabled}
											type='text'
											placeholder='Enter vehicle color'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='image'
							control={form.control}
							render={({ field }) => (
								<FormItem hidden>
									<FormLabel className='text-title1Bold pl-4'>
										Image
									</FormLabel>

									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											disabled={disabled}
											type='text'
											placeholder='IMAGE URL'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='status'
							control={form.control}
							render={({ field }) => (
								<FormItem hidden>
									<FormLabel className='text-title1Bold pl-4'>
										Vehicle Status
									</FormLabel>

									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={disabled}
									>
										<FormControl>
											<SelectTrigger className='relative text-body flex  items-center h-14 rounded-2xl'>
												<SelectValue placeholder='Choose Status' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='ACTIVE'>
												ACTIVE
											</SelectItem>
											<SelectItem value='INACTIVE'>
												INACTIVE
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='type'
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
											disabled={disabled}
											type='text'
											placeholder='Enter vehicle type'
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
											disabled={disabled}
											type='text'
											placeholder='Enter VIN'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='barcode'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										Sticker Number
									</FormLabel>

									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											disabled={disabled}
											type='text'
											placeholder='T-01'
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
											disabled={disabled}
											type='text'
											placeholder='Enter tracker ID'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Separator className='my-2' />
					<div className='h-12 shrink-0 bg-primary w-full rounded-2xl flex overflow-hidden text-white items-center'>
						<div className='h-12 w-12 bg-black p-3'>
							<Plus />
						</div>
						<div className='p-3'>
							OWNER&apos;S INFORMATION
						</div>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						<FormField
							name='owner_name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										Name
									</FormLabel>

									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											disabled={disabled}
											type='text'
											placeholder='Enter name of owner'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='owner_whatsapp'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										WhatsApp Phone
									</FormLabel>

									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											disabled={disabled}
											type='text'
											placeholder='+2349012345678'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='owner_phone'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										Phone
									</FormLabel>

									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											disabled={disabled}
											type='text'
											placeholder='+2349012345678'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='owner_address'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										Residential Address
									</FormLabel>

									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											disabled={disabled}
											type='text'
											placeholder='Enter address of owner'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='owner_gender'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										Gender
									</FormLabel>

									<FormControl>
										<Select
											onValueChange={
												field.onChange
											}
											defaultValue={
												field.value
											}
											disabled={disabled}
										>
											<FormControl>
												<SelectTrigger className='relative text-body flex  items-center h-14 rounded-2xl'>
													<SelectValue placeholder='Choose Gender' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='MALE'>
													MALE
												</SelectItem>
												<SelectItem value='FEMALE'>
													FEMALE
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='owner_marital_status'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										Marital Status
									</FormLabel>

									<FormControl>
										<Select
											onValueChange={
												field.onChange
											}
											defaultValue={
												field.value
											}
											disabled={disabled}
										>
											<FormControl>
												<SelectTrigger className='relative text-body flex  items-center h-14 rounded-2xl'>
													<SelectValue placeholder='Choose Status' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='SINGLE'>
													SINGLE
												</SelectItem>
												<SelectItem value='MARRIED'>
													MARRIED
												</SelectItem>
												<SelectItem value='DIVORCED'>
													DIVORCED
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='owner_email'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-title1Bold pl-4'>
										Email
									</FormLabel>

									<FormControl>
										<Input
											className='relative text-body flex  items-center h-14 rounded-2xl'
											{...field}
											disabled={disabled}
											type='text'
											placeholder='Enter email of owner'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className=''>
						{!disabled && (
							<Button
								className='w-32'
								type='submit'
							>
								{isLoading
									? loadingSpinner
									: 'Save Changes'}
							</Button>
						)}
					</div>
				</form>
			</Form>
			{disabled && (
				<div className='flex items-center justify-between gap-5'>
					<Button
						className='w-32'
						onClick={() => setDisabled(false)}
						type='button'
					>
						Edit
					</Button>
					<Button
						className='px-0 gap-1.5'
						variant='link'
						asChild
					>
						<Link href={`/vehicles/${vehicle.id}`}>
							<ArrowLeft className='h-4 w-4' />
							Go Back
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
}
