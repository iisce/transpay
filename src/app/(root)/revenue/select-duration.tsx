'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { format, subDays, subMonths, subWeeks, subYears } from 'date-fns';
import { cn } from '@/lib/utils';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Separator } from '@radix-ui/react-dropdown-menu';

const today = new Date();
const oneDayAgo = subDays(today, 1);
const oneWeekAgo = subWeeks(today, 1);
const oneMonthAgo = subMonths(today, 1);
const oneYearAgo = subYears(today, 1);

const durationList = [
	{
		name: '1D',
		start_date: format(oneDayAgo, 'yyyy-MM-dd'),
		end_date: format(today, 'yyyy-MM-dd'),
	},
	{
		name: '1W',
		start_date: format(oneWeekAgo, 'yyyy-MM-dd'),
		end_date: format(today, 'yyyy-MM-dd'),
	},
	{
		name: '1M',
		start_date: format(oneMonthAgo, 'yyyy-MM-dd'),
		end_date: format(today, 'yyyy-MM-dd'),
	},
	{
		name: '1Y',
		start_date: format(oneYearAgo, 'yyyy-MM-dd'),
		end_date: format(today, 'yyyy-MM-dd'),
	},
];

export default function SelectDuration({ d }: { d: string }) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<Button variant='outline'>Select Duration: {d}</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Choose Duration</DialogTitle>
						<DialogDescription>
							{`Select predefined duration or pick a date-range`}
						</DialogDescription>
					</DialogHeader>
					<div
						className=''
						onClick={() => setOpen(false)}
					>
						<DurationList />
					</div>
					<Separator className='h-[1px] bg-primary' />
					<DatePickerWithRange
						open={open}
						setOpen={setOpen}
					/>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
		>
			<DrawerTrigger asChild>
				<Button variant='outline'>Select Duration {d}</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle>Choose Duration</DrawerTitle>
					<DrawerDescription>
						{`Make changes to your profile here. Click save when
						you're done.`}
					</DrawerDescription>
				</DrawerHeader>
				<DrawerClose asChild>
					<DurationList className='px-4' />
				</DrawerClose>
				<Separator className='h-[1px] bg-primary' />
				<DatePickerWithRange
					open={open}
					setOpen={setOpen}
				/>
				<DrawerFooter className='pt-2'>
					<DrawerClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function DurationList({ className }: { className?: string }) {
	const router = useRouter();
	return (
		<div className={cn('grid items-start gap-4', className)}>
			{durationList.map((opt, k) => (
				<Button
					key={k}
					onClick={() => {
						router.push(
							`/revenue?start_date=${opt.start_date}&end_date=${opt.end_date}&d=${opt.name}`
						);
					}}
				>
					{opt.name}
				</Button>
			))}
		</div>
	);
}
