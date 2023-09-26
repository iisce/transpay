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
import { Textarea } from '../ui/textarea';
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

const agentFormSchema = z.object({
	city: z
		.string({
			required_error: 'Please enter city.',
		})
		.min(3, {
			message: 'City must be at least 3 characters.',
		})
		.max(30, {
			message: 'City must not be longer than 30 characters.',
		}),
	confirmPassword: z.string().min(8),
	country: z
		.string({
			required_error: 'Please enter country.',
		})
		.min(3, {
			message: 'Country must be at least 3 characters.',
		})
		.max(30, {
			message: 'Country must not be longer than 30 characters.',
		}),
	email: z
		.string({
			required_error: 'Please enter an email.',
		})
		.email(),
	identification_number: z
		.string({
			required_error: 'Please enter identification number.',
		})
		.min(8, {
			message: 'ID number must be at least 8 characters.',
		})
		.max(20, {
			message: 'ID Number must not be longer than 20 characters.',
		}),
	identification_type: z.string({
		required_error: 'Please select a mode of identification',
	}),
	location: z
		.string({
			required_error: 'Please enter location.',
		})
		.min(3, {
			message: 'Location must be at least 3 characters.',
		})
		.max(30, {
			message: 'Location must not be longer than 30 characters.',
		}),
	name: z
		.string()
		.min(2, {
			message: 'Name must be at least 2 characters.',
		})
		.max(30, {
			message: 'Name must not be longer than 30 characters.',
		}),
	password: z.string().refine((password) => {
		return (
			password.length >= 8 &&
			/[A-Z]/.test(password) &&
			/\d/.test(password)
		);
	}, 'The password must contain at least one uppercase letter and one number and be at least 8 characters long.'),
	phone: z.string({
		required_error: 'Please enter phone number.',
	}),
	postcode: z
		.string()
		.min(5, {
			message: 'postcode must be at least 5 characters.',
		})
		.max(7, {
			message: 'postcode must not be longer than 7 characters.',
		}),
	role: z
		.string({
			required_error: 'Please enter role.',
		})
		.refine((value) => ['agent'].includes(value), {
			message: 'Invalid means of identification.',
		}),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AgentFormValues> = {
	name: '',
	password: '',
	phone: '',
	email: '',
	identification_type: 'nin',
	identification_number: '',
	role: 'agent',
	location: '',
	city: '',
	country: 'nigeria',
	postcode: '',
};

export function AgentForm() {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const { toast } = useToast();
	const form = useForm<AgentFormValues>({
		resolver: zodResolver(agentFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	async function onSubmit(data: AgentFormValues) {
		setIsLoading(true);
		try {
			const createAgentResponse = await fetch('/api/create-agent', {
				method: 'POST',
				body: JSON.stringify({
					name: data.name,
					password: data.password,
					phone: data.phone,
					email: data.email,
					identification_type: data.identification_type,
					identification_number: data.identification_number,
					role: data.role,
					location: data.location,
					city: data.city,
					country: data.country,
					postcode: data.postcode,
				}),
			});
			const result = await createAgentResponse.json();
			if (
				createAgentResponse.status > 199 &&
				createAgentResponse.status < 299
			) {
				toast({
					title: 'Agent Created Successfully',
				});
				setIsLoading(false);
				setOpen(true);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				console.log('Something went wrong');
				toast({
					title: 'Agent NOT Created',
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
					<FormField
						control={form.control}
						name='identification_type'
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
					/>
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
					<FormField
						control={form.control}
						name='identification_number'
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
					/>
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
					<FormField
						control={form.control}
						name='location'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Location</FormLabel>
								<FormControl>
									<Input
										placeholder='Location'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='city'
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input
										placeholder='City'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='country'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Country</FormLabel>
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
										<SelectItem value='nigeria'>
											Nigeria
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='postcode'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Postcode</FormLabel>
								<FormControl>
									<Input
										placeholder='Postcode'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
						<Link href='/agents'>Cancel</Link>
					</Button>
					<Button
						className='w-28'
						type='submit'
					>
						{isLoading ? loadingSpinner : 'Add Agent'}
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
									Agent Account Created
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
									<Link href={`/agents`}>
										View Agents
									</Link>
								</AlertDialogAction>
								<AlertDialogCancel className='rounded-xl'>
									New Agent
								</AlertDialogCancel>
							</div>
						</div>
					</AlertDialogContent>
				</AlertDialog>
			</form>
		</Form>
	);
}
