'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch } from 'react';
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
	pin: z.string().min(6, {
		message: 'Your First Level PIN must be 6 characters.',
	}),
});

export default function StepOne({
	pin1,
	setPin1,
	setStep,
}: {
	pin1: string;
	setPin1: Dispatch<React.SetStateAction<string>>;
	setStep: Dispatch<React.SetStateAction<2 | 1 | 3>>;
}) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		setPin1(data.pin);
		if (data.pin === '150519') {
			toast({
				title: 'First Level Pin Correct',
			});
			setStep(2);
		} else {
			toast({
				title: 'Incorrect First Level PIN',
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
						<FormItem className=''>
							<FormLabel>
								Enter Your First Level PIN
							</FormLabel>
							<FormControl>
								<InputOTP
									className=''
									maxLength={6}
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
								This pin is required for administrative
								access.
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
