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
import React, { useEffect } from 'react';
import { successIcon } from '@/lib/icons';
import { Checkbox } from '../ui/checkbox';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const agentFormSchema = z.object({
	email: z
		.string({
			required_error: 'Please enter an email.',
		})
		.email(),
	password: z.string().refine((password) => {
		return (
			password.length >= 8
			// && /[A-Z]/.test(password) &&
			// /\d/.test(password)
		);
	}, 'The password must contain at least one uppercase letter and one number and be at least 8 characters long.'),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AgentFormValues> = {
	email: '',
	password: '',
};

export function AuthLoginForm() {
	const { status } = useSession();
	const router = useRouter();

	const [open, setOpen] = React.useState(false);
	const { toast } = useToast();
	const form = useForm<AgentFormValues>({
		resolver: zodResolver(agentFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	async function onSubmit(data: AgentFormValues) {
		try {
			const signInResponse = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: true,
				callbackUrl: '/',
			});
			console.log(signInResponse);

			if (!signInResponse || !signInResponse.ok) {
				toast({
					title: 'Invalid Credentials:',
					description: 'Check your email or password',
				});
				console.log(signInResponse);
			} else {
				router.refresh();
				toast({
					title: 'Successful Sign in',
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (status === 'authenticated') {
			router.refresh();
			router.push('/dashboard');
		}
	}, [status]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mb-20 flex flex-col gap-5'
			>
				{' '}
				<div className=' capitalize text-h4Bold sm:text-h3Bold'>
					Login to your account
				</div>
				<div className='grid gap-5'>
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
					<div className='flex items-center space-x-2'>
						<Checkbox id='remember' />
						<label
							htmlFor='remember'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Remember Me
						</label>
					</div>
				</div>
				<div className='grid'>
					<Button type='submit'>Login</Button>
					<div className='flex items-center'>
						Forgot your password?
						<Button
							asChild
							variant='link'
						>
							<Link href='/reset-password'>
								Reset your Password
							</Link>
						</Button>
					</div>
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
							<div className='flex flex-col text-left whitespace-nowrap  mb-5'>
								<div className=''>
									Email: {form.getValues().email}
								</div>
								<div className=''>
									Password:{' '}
									{form.getValues().password}
								</div>
							</div>
							<div className='flex flex-col gap-3'>
								<AlertDialogAction
									asChild
									className='rounded-xl'
								>
									<Link
										href={`/dashboard/agents/agentid`}
									>
										View Account
									</Link>
								</AlertDialogAction>
								<AlertDialogCancel
									asChild
									className='rounded-xl'
								>
									<Link href={`/dashboard/agents`}>
										Dashboard
									</Link>
								</AlertDialogCancel>
							</div>
						</div>
					</AlertDialogContent>
				</AlertDialog>
			</form>
		</Form>
	);
}
