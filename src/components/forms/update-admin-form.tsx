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
import DeleteAdminButton from '../shared/delete-buttons/delete-admin-button';
import { Checkbox } from '../ui/checkbox';

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
	blacklisted: z.boolean().optional(),
	phone: z.string({
		required_error: 'Please enter phone number.',
	}),
	role: z.string({
		required_error: 'Please choose role.',
	}),
});

type AdminFormValues = z.infer<typeof adminFormSchema>;

export function UpdateAdminForm({ admin }: { admin: IAdmin }) {
	const [disabled, setDisabled] = React.useState<boolean>(true);
	const defaultValues: Partial<AdminFormValues> = {
		name: admin.name,
		email: admin.email,
		phone: admin.phone,
		role: admin.role,
		blacklisted: admin.blacklisted,
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
		const payload = {
			admin_id: admin.admin_id,
			name: data.name,
			email: data.email,
			phone: data.phone,
			role: data.role,
			blacklisted: data.blacklisted,
		};
		try {
			const createAdminResponse = await fetch('/api/create-admin', {
				method: 'PUT',
				body: JSON.stringify(payload),
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
					</div>
					<FormField
						control={form.control}
						name='blacklisted'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 '>
								<FormControl>
									<Checkbox
										disabled={disabled}
										checked={field.value}
										onCheckedChange={
											field.onChange
										}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>
										Blacklist Admin
									</FormLabel>
								</div>
							</FormItem>
						)}
					/>

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
