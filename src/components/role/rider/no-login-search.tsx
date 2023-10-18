import { CopyButton } from '@/components/shared/copy-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { debtColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getVehicleSummaryByPlateNumber } from '@/lib/controllers/vehicle-controller';
import { failureIcon, successIcon } from '@/lib/icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function NoLoginSearch({
	plate_number,
}: {
	plate_number: string;
}) {
	const vehicle = await getVehicleSummaryByPlateNumber(plate_number);
	if (!vehicle) {
		notFound();
	}
	const onWaiver = vehicle.status === 'inactive';

	const pendingPayments = vehicle.VehicleTransactions.filter(
		(transaction) => transaction.payment_status === 'pending'
	);
	// console.log(pendingPayments);
	const totalPendingAmount = pendingPayments.reduce(
		(acc, order) => acc + order.amount,
		0
	);
	const isOwing = pendingPayments.length > 0;

	return (
		<div className='h-full w-full max-w-lg mx-auto p-3 flex flex-col gap-6'>
			<div className='flex flex-col text-center justify-between w-full gap-3'>
				<div className='text-sm'>
					<div className='uppercase'>{`Owner`}</div>
					<div className='text-h4Bold'>
						{vehicle.owners_name}
					</div>
				</div>
				<div className='text-sm'>
					<div className='uppercase'>Plate number</div>
					<div className='text-h4Bold'>
						{vehicle.plate_number}
					</div>
				</div>
			</div>
			<div className='  w-full'>
				{onWaiver ? (
					<div className='flex flex-col p-3 w-full items-center gap-2 mb-20'>
						<div className=' text-green-500'>
							{successIcon}
						</div>
						<div className='flex py-2'>
							<div className='shrink-0 grow-0 text-title1Bold'>
								Vehicle is on Waiver!
							</div>
						</div>
						<Button asChild>
							<Link
								href={'waiver/history'}
								className='uppercase'
							>
								View Waiver History
							</Link>
						</Button>
					</div>
				) : isOwing ? (
					<div className='flex flex-col p-3 w-full items-center gap-2 mb-20'>
						<div className=' text-red-500'>{failureIcon}</div>
						<div className='flex py-2'>
							<div className='shrink-0 grow-0 text-title1Bold'>
								Vehicle is Owing!
							</div>
						</div>
						<Card className='grid gap-3 w-full p-3 bg-secondary'>
							<div className='flex flex-col justify-between items-center'>
								<div className=''>Amount Owed:</div>
								<div className='text-destructive-foreground font-bold text-4xl'>
									{`₦${totalPendingAmount}`}
								</div>
							</div>
							<div className='flex justify-between items-center gap-5'>
								<div className=''>Due Date:</div>
								{new Date().toDateString()}
							</div>
							<div className='uppercase text-center font-bold py-3'>
								Payment Details
							</div>
							<div className='flex justify-between items-center gap-5'>
								<div className=''>Bank Name</div>
								{vehicle.VehicleWallet.bank_name}
							</div>
							<div className='flex justify-between items-center gap-5'>
								<div className=''>Account Name</div>
								{vehicle.VehicleWallet.account_name}
							</div>
							<div className='flex justify-between items-center gap-5'>
								<div className=''>Account Number</div>
								{vehicle.VehicleWallet.nuban}
							</div>
							<CopyButton
								label='Copy Account Details'
								text={`${vehicle.VehicleWallet.bank_name} ${vehicle.VehicleWallet.nuban} ${vehicle.VehicleWallet.account_name}`}
							/>
						</Card>
						<div className='w-full grid'>
							<DataTable
								columns={debtColumns}
								data={vehicle.VehicleTransactions.slice(
									0,
									4
								)}
							/>
						</div>
					</div>
				) : (
					<div className='flex flex-col p-3 w-full items-center gap-2 mb-20'>
						<div className=' text-green-500'>
							{successIcon}
						</div>
						<div className='flex py-2'>
							<div className='shrink-0 grow-0 text-title1Bold'>
								Vehicle is clear!
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
