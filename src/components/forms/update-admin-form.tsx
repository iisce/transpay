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
import { Button } from '../ui/button';
import React from 'react';
import { loadingSpinner } from '@/lib/icons';
import { NextResponse } from 'next/server';
import DeleteAdminButton from '../shared/delete-admin-button';

const adminFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: 'Username must be at least 2 characters.',
		})
		.max(30, {
			message: 'Username must not be longer than 30 characters.',
		}),
	email: z
		.string({
			required_error: 'Please enter an email.',
		})
		.email(),
	// moi: z.string({
	// 	required_error: 'Please select a mode of identification',
	// }),
	phone: z.string({
		required_error: 'Please enter phone number.',
	}),
	role: z.string({
		required_error: 'Please choose role.',
	}),
	// idNumber: z
	// 	.string({
	// 		required_error: 'Please enter identification number.',
	// 	})
	// 	.min(8, {
	// 		message: 'ID number must be at least 8 characters.',
	// 	})
	// 	.max(20, {
	// 		message: 'Username must not be longer than 20 characters.',
	// 	}),
	// address: z.string().max(160).min(15),
});

type AdminFormValues = z.infer<typeof adminFormSchema>;

export function UpdateAdminForm({ admin }: { admin: IAdmin }) {
	const [disabled, setDisabled] = React.useState<boolean>(true);
	const defaultValues: Partial<AdminFormValues> = {
		name: admin.name,
		email: admin.email,
		phone: admin.phone,
		role: 'admin',
	};

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { toast } = useToast();
	const form = useForm<AdminFormValues>({
		resolver: zodResolver(adminFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	async function onSubmit(data: AdminFormValues) {
		setIsLoading(true);
		try {
			const createAdminResponse = await fetch('/api/create-admin', {
				method: 'PUT',
				body: JSON.stringify({
					admin_id: admin.admin_id,
					name: data.name,
					email: data.email,
					phone: data.phone,
					role: data.role,
				}),
			});
			const result = await createAdminResponse.json();
			if (
				createAdminResponse.status > 199 &&
				createAdminResponse.status < 299
			) {
				toast({
					title: 'Admin Updated Successfully',
				});
				setIsLoading(false);
				setDisabled(true);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'Not Updated',
				});
				return null;
			}
		} catch (error) {
			setIsLoading(false);
		}
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='mb-20 flex flex-col gap-5'
				>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
											placeholder='Full Name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
						control={form.control}
						name='moi'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Means of Identification
								</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='h-12'>
											<SelectValue placeholder='Select a mean of Identification' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='nin'>
											NIN
										</SelectItem>
										<SelectItem value='bvn'>
											BVN
										</SelectItem>
										<SelectItem value='pvc'>
											Voters Card
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/> */}
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
											placeholder='Enter phone number'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
						control={form.control}
						name='idNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Identification Number
								</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter identification number'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Email Address
									</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
											placeholder='Email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
						control={form.control}
						name='address'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Address'
										className='resize-none'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
						{/* <FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Enter Password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Confirm Password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
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
					<Button className='w-32'>
						<DeleteAdminButton id={admin.admin_id} />
					</Button>
				</div>
			)}
		</>
	);
}
