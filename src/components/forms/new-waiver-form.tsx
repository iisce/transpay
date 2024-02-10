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
import { Dialog, DialogContent } from '../ui/dialog';
import React from 'react';
import { loadingSpinner, successIcon } from '@/lib/icons';
import { NextResponse } from 'next/server';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import { DatePickerWithRange } from '../ui/date-range-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';

const waiverFormSchema = z.object({
	start_date: z.date({ required_error: 'Enter Start Date' }),
	end_date: z.date({ required_error: 'Enter End Date' }),
	reason: z
		.string({
			required_error: 'Please enter a valid reason.',
		})
		.min(3, {
			message: 'Reason must be at least 3 characters.',
		})
		.max(50, {
			message: 'Reason must not be longer than 50 characters.',
		}),
	id: z.string({ required_error: 'No vehicle detected' }),
});

export type waiverFormValues = z.infer<typeof waiverFormSchema>;

// This can come from your database or API.
export function NewWaiverForm({ vehicle }: { vehicle: IVehicleSummary }) {
	const defaultValues: Partial<waiverFormValues> = {
		reason: '',
		id: vehicle.vehicle_id,
	};
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { toast } = useToast();
	const form = useForm<waiverFormValues>({
		resolver: zodResolver(waiverFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	async function onSubmit(data: waiverFormValues) {
		setIsLoading(true);
		const payload = {
			id: data.id,
			start_date: data.start_date,
			end_date: data.end_date,
			reason: data.reason,
		};
		console.log('new waiver form client... ', { payload });
		try {
			const createWaiverResponse = await fetch('/api/create-waiver', {
				method: 'POST',
				body: JSON.stringify(payload),
			});
			const result = await createWaiverResponse.json();
			if (
				createWaiverResponse.status > 199 &&
				createWaiverResponse.status < 299
			) {
				toast({
					title: 'waiver Created Successfully',
				});
				setIsLoading(false);
				form.reset();
				router.refresh();
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'waiver NOT Created',
				});
				return null;
			}
		} catch (error: any) {
			setIsLoading(false);
			toast({ title: 'Feature Coming soon' });
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className=''
			>
				<div className='grid grid-cols-1 gap-5 mb-10 text-start'>
					<FormField
						control={form.control}
						name='start_date'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Start Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-full pl-3 text-left font-normal',
													!field.value &&
														'text-muted-foreground'
												)}
											>
												{field.value ? (
													format(
														field.value,
														'PPP'
													)
												) : (
													<span>
														Pick a
														date
													</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className='w-auto p-0'
										align='start'
									>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date >
													addDays(
														new Date(),
														7
													) ||
												date < new Date()
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='end_date'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>End Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-full pl-3 text-left font-normal',
													!field.value &&
														'text-muted-foreground'
												)}
											>
												{field.value ? (
													format(
														field.value,
														'PPP'
													)
												) : (
													<span>
														Pick a
														date
													</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className='w-auto p-0'
										align='start'
									>
										<Calendar
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date >
													addDays(
														form.getValues(
															'start_date'
														),
														5
													) ||
												date <=
													form.getValues(
														'start_date'
													)
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='reason'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Reason</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Tell us why you need a waiver'
										className='resize-none'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid'>
					<Button
						className=''
						type='submit'
						// disabled
					>
						{isLoading ? loadingSpinner : 'Add waiver'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
