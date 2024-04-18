'use client';
import { BUS_IMAGE_SAMPLE } from '@/lib/consts';
import { loadingSpinner } from '@/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { NextResponse } from 'next/server';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
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
import { Separator } from '../ui/separator';
import { useToast } from '../ui/use-toast';

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
});

type vehicleFormValues = z.infer<typeof vehicleFormSchema>;

const defaultValues: Partial<vehicleFormValues> = {
	category: 'KEKE',
	color: 'OFFICIAL COLOR',
	image: BUS_IMAGE_SAMPLE,
	status: 'ACTIVE',
	asin_number: '',
	t_code: '',
};

export default function CreateVehicleForm() {
	const [newVehicleId, setNewVehicleId] = React.useState<string>('');
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const form = useForm<vehicleFormValues>({
		resolver: zodResolver(vehicleFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	const onSubmit = async (data: vehicleFormValues) => {
		setIsLoading(true);
		try {
			const createVehicleResponse = await fetch(
				'/api/create-vehicle',
				{
					method: 'POST',
					body: JSON.stringify({
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
			``;
			const result = await createVehicleResponse.json();
			console.log('....NEW FORM  ', result);
			if (createVehicleResponse.status) {
				toast({
					title: 'Vehicle Created Successfully',
				});
				setIsLoading(false);
				setOpen(true);
				window.location.href = '/vehicles?page=1&limit=15';
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
					<div className='p-3'>OWNER&apos;S INFORMATION</div>
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
										onValueChange={field.onChange}
										defaultValue={field.value}
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
										onValueChange={field.onChange}
										defaultValue={field.value}
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
										type='text'
										placeholder='Enter email of owner'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex justify-center items-center gap-6 text-title1Bold'>
					<Button
						variant={'outline'}
						size='lg'
						type='button'
						asChild
						className='p-4 py-2 rounded-normal w-28 '
					>
						<Link href={'/vehicles?page=1&limit=15'}>
							Back
						</Link>
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
		</Form>
	);
}
