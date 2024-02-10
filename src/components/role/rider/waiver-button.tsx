'use client';
import { NewWaiverForm } from '@/components/forms/new-waiver-form';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

export default function WaiverButton({
	vehicle,
}: {
	vehicle: IVehicleSummary;
}) {
	const isDesktop = useMediaQuery('(min-width: 768px)');
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	if (isDesktop)
		return (
			<Dialog open={isOpen}>
				<Button
					onClick={() => setIsOpen(!isOpen)}
					className='justify-start rounded-xl'
					variant={'default'}
				>
					<PlusIcon className='mr-1 h-4 w-4 shrink-0' />
					New Waiver
				</Button>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogTitle>Request New Waiver</DialogTitle>
					<NewWaiverForm
						setIsOpen={setIsOpen}
						vehicle={vehicle}
					/>
				</DialogContent>
			</Dialog>
		);
	return (
		<Drawer open={isOpen}>
			<Button
				onClick={() => setIsOpen(!isOpen)}
				className='justify-start rounded-xl'
				variant={'default'}
			>
				<PlusIcon className='mr-1 h-4 w-4 shrink-0' />
				New Waiver
			</Button>
			<DrawerContent>
				<DrawerHeader className='gap-5'>
					<DrawerTitle>Request New Waiver</DrawerTitle>
					<NewWaiverForm
						setIsOpen={setIsOpen}
						vehicle={vehicle}
					/>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	);
}
