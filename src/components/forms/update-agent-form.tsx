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
import DeleteAgentButton from '../shared/delete-agent-button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

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

export function UpdateAgentForm({ agent }: { agent: IAgent }) {
	const [disabled, setDisabled] = React.useState<boolean>(true);
	const defaultValues: Partial<AgentFormValues> = {
		name: agent.name,
		phone: agent.phone,
		email: agent.email.toLowerCase(),
		identification_type: agent.identification_type.toLowerCase(),
		identification_number: agent.identification_number,
		role: agent.role.toLowerCase(),
		location: agent.location,
		city: agent.city,
		country: agent.country,
		postcode: agent.postcode,
	};

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
				method: 'PUT',
				body: JSON.stringify({
					agent_id: agent.agent_id,
					name: data.name,
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
					title: 'Updated Successfully',
				});
				setIsLoading(false);
				setDisabled(true);
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
	}

	return (
		<>
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
							name='identification_type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Means of Identification
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={disabled}
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
							name='identification_number'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Identification Number
									</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
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
						<FormField
							control={form.control}
							name='location'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
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
											disabled={disabled}
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
										disabled={disabled}
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
											disabled={disabled}
											placeholder='Postcode'
											{...field}
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
					<Button className='w-32'>
						<DeleteAgentButton id={agent.agent_id} />
					</Button>
				</div>
			)}
		</>
	);
}
