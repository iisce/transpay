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
import Link from 'next/link';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
} from '../ui/alert-dialog';
import React from 'react';
import { loadingSpinner, successIcon } from '@/lib/icons';
import { NextResponse } from 'next/server';

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
	password: z.string().refine((password) => {
		return (
			password.length >= 8
			// &&
			// /[A-Z]/.test(password) &&
			// /\d/.test(password)
		);
	}, 'The password must contain at least one uppercase letter and one number and be at least 8 characters long.'),
	confirmPassword: z.string().min(8),
});

type AdminFormValues = z.infer<typeof adminFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AdminFormValues> = {
	name: '',
	email: '',
	phone: '',
	role: 'admin',
	password: '',
	confirmPassword: '',
};
export function AdminForm() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
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
				method: 'POST',
				body: JSON.stringify({
					name: data.name,
					email: data.email,
					password: data.password,
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
					title: 'Admin Created Successfully',
				});
				setIsLoading(false);
				setOpen(true);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'Admin NOT Created',
				});
				return null;
			}
		} catch (error) {
			setIsLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mb-20 flex flex-col gap-5'
			>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
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
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input
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
					<FormField
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
					/>
				</div>
				<div className='flex gap-5 justify-center'>
					<Button
						className='w-28 border-primary text-primary'
						variant='outline'
						asChild
					>
						<Link href='/admins'>Cancel</Link>
					</Button>
					<Button
						className='w-28'
						type='submit'
					>
						{isLoading ? loadingSpinner : 'Add Admin'}
					</Button>
				</div>
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
									Admin Account Created
								</div>
							</div>
							<div className='flex flex-col text-center mb-5'>
								<div>
									E-mail: {form.getValues('email')}
								</div>
								<div>
									Password:{' '}
									{form.getValues('password')}
								</div>
							</div>
							<div className='flex flex-col gap-3'>
								<AlertDialogAction
									asChild
									className='rounded-xl'
								>
									<Link href={`/admins`}>
										View Admins
									</Link>
								</AlertDialogAction>
								<AlertDialogCancel className='rounded-xl'>
									New Admin
								</AlertDialogCancel>
							</div>
						</div>
					</AlertDialogContent>
				</AlertDialog>
			</form>
		</Form>
	);
}
