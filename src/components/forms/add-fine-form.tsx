'use client';
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
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

const driverFormSchema = z.object({
	DateTime: z.string({
		description: 'date & time of offence',
	}),
	Offence: z
		.string()
		.refine(
			(value) =>
				['dangerous driving', 'overloading', 'failure to move over', 'road obstruction', 'speed limit violation', 'caution sign violation', 'wrongful overtaking'].includes(value),
			{
				message: 'Invalid selection',
			}
		),

});

type DriverFormValues = z.infer<typeof driverFormSchema>;

export default function FineDriverForm() {
	const form = useForm<DriverFormValues>({
		resolver: zodResolver(driverFormSchema),
		mode: 'onChange',
	});

	const onSubmit = (data: DriverFormValues) => {
		console.log(data);
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
						name='Offence'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									{' '}
									Offence
								</FormLabel>

								<Select defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='relative text-body flex  items-center h-14 rounded-2xl'>
											<SelectValue placeholder='Select offence' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='dangerous driving'>
											Dangerous Driving
										</SelectItem>
										<SelectItem value='overloading'>
											Overloading
										</SelectItem>
										<SelectItem value='failure to move over'>
											Failure To Move Over
										</SelectItem>
										<SelectItem value='road obstruction'>
                                        Road Obstruction
										</SelectItem>
                                        <SelectItem value='speed limit violation'>
                                        Speed Limit Violation
										</SelectItem>
                                        <SelectItem value='caution sign violation'>
                                        Caution Sign Violation
										</SelectItem>
                                        <SelectItem value='wrongful overtaking'>
                                        Wrongful Overtaking
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>

					<FormField
						name='DateTime'
						control={form.control}
						render={({ field }) => (
							<FormItem >
								<FormLabel className='text-title1Bold pl-4'>
									Date/Time
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='date & time of offence'
										required
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					
				</div>
				<div className='flex justify-center items-center my-4 gap-6 text-title1Bold'>
					<Button
						variant={'outline'}
						size='lg'
						type='button'
						asChild
						className='p-4 py-2 rounded-normal w-28'
					>
						<Link href={'/web-agent/driver/0'}>
							Back
						</Link>
					</Button>
					<Button
						variant={'default'}
						size='lg'
						type='button'
						asChild
						className='p-4 py-2 rounded-normal w-28'
					>
						<Link
							href={
								'/'
							}
						>
							Submit Fine
						</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
