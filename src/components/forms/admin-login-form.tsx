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
import { Checkbox } from '../ui/checkbox';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

const agentFormSchema = z.object({
	email: z
		.string({
			required_error: 'Please enter an email.',
		})
		.email(),
	password: z.string(),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AgentFormValues> = {
	email: '',
	password: '',
};

export function AdminLoginForm({ error }: { error?: string }) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const router = useRouter();

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
			const signInResponse = await signIn('credentials', {
				email: data.email,
				password: data.password,
				role: 'admin',
				redirect: true,
				callbackUrl: '/dashboard',
			});
			router.push('/dashboard');
			return signInResponse;
		} catch (error: any) {
			console.log(error);
			toast({
				title: error?.message || 'Check Internet',
			});
			setIsLoading(false);
			throw new Error(error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mb-5 flex flex-col gap-5'
			>
				<div className='grid gap-5'>
					{error && (
						<div className='text-destructive-foreground text-center text-xs'>
							{error}
						</div>
					)}
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
				<div className='grid gap-2'>
					<Button
						disabled={isLoading}
						type='submit'
					>
						{isLoading ? loadingSpinner : 'Login'}
					</Button>
					<div className='flex items-center text-xs md:text-base gap-2'>
						Forgot your password?{' '}
						<Link href='/reset-password'>
							Reset your Password
						</Link>
					</div>
				</div>
			</form>
		</Form>
	);
}
