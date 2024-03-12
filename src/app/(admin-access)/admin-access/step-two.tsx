'use client';
import React, { Dispatch, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import Image from 'next/image';

const FormSchema = z.object({
	pin: z.string().min(4, {
		message: 'Your Second Level PIN must be 4 characters.',
	}),
});

export default function StepTwo({
	pin2,
	setPin2,
	setStep,
}: {
	pin2: string;
	setPin2: Dispatch<React.SetStateAction<string>>;
	setStep: Dispatch<React.SetStateAction<2 | 1 | 3>>;
}) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		setPin2(data.pin);
		if (data.pin === '1505') {
			toast({
				title: 'Access Granted',
			});
			setStep(3);
		} else {
			toast({
				title: 'Incorrect Second Level PIN',
			});
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='text-center flex flex-col items-center justify-start'
			>
				<Link
					href={'/'}
					className='mt-16 mb-10 w-56 mx-auto'
				>
					<Image
						src={'/logo.png'}
						height={50}
						width={200}
						className='shrink-0'
						alt='Transpay Logo'
					/>
				</Link>
				<h1 className='text-2xl lg:text-4xl mb-5'>
					Administrative Access
				</h1>
				<FormField
					control={form.control}
					name='pin'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Enter Your Second Level Pin
							</FormLabel>
							<FormControl>
								<InputOTP
									maxLength={4}
									render={({ slots }) => (
										<InputOTPGroup>
											{slots.map(
												(slot, index) => (
													<InputOTPSlot
														key={
															index
														}
														{...slot}
													/>
												)
											)}{' '}
										</InputOTPGroup>
									)}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								The last four digits of your phone.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className='mt-10 w-full max-w-sm'
					type='submit'
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}
