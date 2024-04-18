import { Button, buttonVariants } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { getVehicleById } from '@/lib/controllers/vehicle-controller';
import { cn } from '@/lib/utils';
import { MapPin, PenLine, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ViewVehicleDetails({ id }: { id: string }) {
	const vehicle = await getVehicleById(id);
	if (!vehicle) return notFound();
	return (
		<>
			<div className='max-w-5xl mx-auto p-5 bg-white shadow-lg rounded-lg'>
				<div className='grid grid-cols-1 lg:grid-cols-2 mb-5 gap-5'>
					<div className='flex-1 w-full'>
						<Image
							alt='Vehicle'
							className='rounded-lg mb-6 lg:mb-0 w-full'
							src={vehicle.image}
							height={400}
							width={400}
						/>
					</div>
					<Card className=''>
						<CardHeader>
							<CardTitle>Vehicle Status</CardTitle>
							<CardDescription>
								Check your vehicle&apos;s status and
								payments.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='flex items-center gap-4'>
								<div className='flex items-center gap-2'>
									<span className='w-2.5 h-2.5 rounded-full bg-green-500' />
									<span className='text-sm font-medium'>
										Active
									</span>
								</div>
								<div className='border-l border-gray-200 h-4' />
								<div className='text-sm font-medium'>
									Next payment date:{' '}
									{
										vehicle.wallet
											.next_transaction_date
									}
								</div>
							</div>
							<div className='border-y border-gray-200 my-4 py-4 grid grid-cols-3 gap-4'>
								<div>
									<div className='text-sm font-medium'>
										Amount owed
									</div>
									<div className='text-xl font-semibold'>
										₦{vehicle.wallet.amount_owed}
									</div>
								</div>
								<div className='flex flex-col items-center'>
									<div className='text-sm font-medium'>
										Net total
									</div>
									<div className='text-xl font-semibold'>
										₦{vehicle.wallet.net_total}
									</div>
								</div>
								<div className='flex flex-col items-end'>
									<div className='text-sm font-medium'>
										Wallet balance
									</div>
									<div className='text-xl font-semibold'>
										₦
										{
											vehicle.wallet
												.wallet_balance
										}
									</div>
								</div>
							</div>
							<div className=''>
								<div>
									<div className='text-sm font-medium'>
										Account Name
									</div>
									<div className='text-xl font-semibold'>
										{
											vehicle.wallet.meta
												.account_name
										}
									</div>
								</div>
								<div>
									<div className='text-sm font-medium'>
										Account Number
									</div>
									<div className='text-xl font-semibold'>
										{vehicle.wallet.meta.nuban}
									</div>
								</div>
								<div>
									<div className='text-sm font-medium'>
										Bank Name
									</div>
									<div className='text-xl font-semibold'>
										{
											vehicle.wallet.meta
												.bank_name
										}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-2 mb-5 gap-5'>
					<Card className=''>
						<CardHeader>
							<CardTitle>Vehicle Information</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='border-t border-gray-200 my-4 py-4 grid grid-cols-2 gap-4'>
								<p className='text-gray-700 mb-4'>
									Plate Number:{' '}
									{vehicle.plate_number}
								</p>
								<p className='text-gray-700 mb-4'>
									Color: {vehicle.color}
								</p>
								<p className='text-gray-700 mb-4'>
									Category: {vehicle.category}
								</p>
								<p className='text-gray-700 mb-4'>
									Status: {vehicle.status}
								</p>
								<p className='text-gray-700 mb-4'>
									VIN: {vehicle.vin}
								</p>
								<p className='text-gray-700 mb-4'>
									Tracker ID:{' '}
									{vehicle.tracker?.terminal_id ??
										'No Tracker Installed'}
								</p>
							</div>
						</CardContent>
					</Card>
					<Card className=''>
						<CardHeader>
							<CardTitle>Owner Information</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='border-t border-gray-200 my-4 py-4 grid grid-cols-2 gap-4'>
								<p className='text-gray-700 mb-4'>
									Name: {vehicle.owner.name}
								</p>
								<p className='text-gray-700 mb-4'>
									Email: {vehicle.owner.email}
								</p>
								<p className='text-gray-700 mb-4'>
									Phone: {vehicle.owner.phone}
								</p>
								<p className='text-gray-700 mb-4'>
									Gender: MALE
								</p>
								<p className='text-gray-700 mb-4'>
									Address: {vehicle.owner.address}
								</p>
								<p className='text-gray-700 mb-4'>
									Marital Status:{' '}
									{vehicle.owner.marital_status}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className='flex mt-5 items-center justify-center'>
					<Link
						className={cn(
							buttonVariants({
								variant: 'outline',
							}),
							'mr-2 gap-1'
						)}
						href={`${vehicle.id}/edit`}
					>
						<PenLine className='h-4 w-4' />
						Edit
					</Link>
					<Button
						className='mr-2 gap-1'
						variant='destructive'
					>
						<Trash className='h-4 w-4' /> Delete
					</Button>
					{vehicle.tracker?.terminal_id && (
						<Link
							className={cn(
								buttonVariants({
									variant: 'outline',
								}),
								'mr-2 gap-1'
							)}
							href={`${vehicle.id}/location`}
						>
							<MapPin className='h-4 w-4' /> Location
						</Link>
					)}
				</div>
			</div>
			<div className='h-full w-full py-6 flex flex-col gap-6 '>
				{/* <div className='flex items-center justify-between'>
					<div className='text-title1Bold'>
						Vehicle Owner: Mr. {vehicle.owner.name}
					</div>
					<div className='flex gap-2 items-center justify-center'>
						{vehicle.tracker && vehicle.tracker !== '' && (
							<Button
								className='justify-start  text-white rounded-xl bg-primary-800'
								asChild
								variant={'default'}
							>
								<Link
									href={`/vehicles/${id}/location`}
									className='shrink-0 whitespace-nowrap'
								>
									<MapPin className='mr-2 h-4 w-4 shrink-0' />
									View live location
								</Link>
							</Button>
						)}
						<Link
							href={`/vehicles/${id}/new-driver`}
							className={cn(buttonVariants())}
						>
							Add Driver
						</Link>
					</div>
				</div> */}
				{/* <Card className=' max-w-lg'>
					<CardHeader className='border-b text-awesome-foreground text-xl py-1'>
					<div className='grid grid-cols-2'>
						<div className=''>Wallet Balance:</div>
						<div className='text-end'>
							₦{vehicle.wallet.wallet_balance}
						</div>
					</div>
				</CardHeader>
					<CardContent className='grid gap-1 py-2 text-lg'>
						<div className='grid grid-cols-2'>
						<div className=''>Total Levy Paid:</div>
						<div className='text-end'>
							₦{vehicle.wallet.net_total}
						</div>
					</div>
						<div
						className={`grid grid-cols-2 	`}
						// ${isOwing ? 'text-red-500' : ''}
					>
						<div className=''>Next Payment Date:</div>
						<div className='text-end'>
							{format(
								new Date(
									vehicle.wallet.next_transaction_date
								),
								'MMMM d, yyyy'
							)}
						</div>
					</div>
						<div className='grid grid-cols-2 text-destructive-foreground'>
						<div className=''>Total Levy Owed:</div>
						<div className='text-end'>
							₦
							{vehicle.VehicleBalance.deficit_balance.toFixed(
								2
							)}
						</div>
					</div>
					</CardContent>
				</Card> */}
				{/* <div className='text-[10px] uppercase text-red-500'>
				** Maintenance is still ongoing and all previous debts
				accrued by customers will be updated before morning
			</div> */}
				{/* <div className=' w-full'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full'>
						{role && (
							<>
								<DashboardCard
									name='Vehicle Information'
									href={`${id}/vehicle-info`}
									image={'/personalinfo.png'}
									description={
										'View Vehicle information'
									}
								/>

								<DashboardCard
								name='Drivers'
								href={`${id}/drivers`}
								image={'/fineandpenal.png'}
								description='Fine Driver & Check Fine Payment'
							/>
								{role?.toLowerCase() !== 'agent' && (
									<>
										<DashboardCard
											name='Payment'
											href={`${id}/payments`}
											image={'/payment.png'}
											description={
												'Make Payment & Check Payment History'
											}
										/>

										<DashboardCard
										name='Fines & Penalties'
										href={`${id}/fines`}
										image={'/fineandpenal.png'}
										description='Fine Driver & Check Fine Payment'
									/>
									</>
								)}
								<DashboardCard
									name='Waiver Form'
									href={`${id}/waiver`}
									image={'/fineandpenal.png'}
									description='Fill waiver form to process driver grace period'
								/>
							</>
						)}
					</div>
					{role && (
						<div className='flex flex-col gap-5'>
							{role?.toLowerCase() !== 'agent' && (
								<>
									<div className='flex flex-col gap-2'>
									<div className='flex justify-between py-2'>
										<div className='shrink-0 grow-0 text-title1Bold'>
											Fine History
										</div>
										<div className='shrink-0 grow-0 text-title1Bold'>
											<Button
												asChild
												variant='link'
											>
												<Link
													href={`/vehicles/${id}/fines`}
												>
													See all
												</Link>
											</Button>
										</div>
									</div>
									<div className=''>
										<DataTable
											columns={
												viewDriversColumns
											}
											data={VIEW_DRIVER_TABLE.slice(
												0,
												3
											)}
										/>
									</div>
								</div>
									<div className='flex flex-col gap-2 '>
										<div className='flex justify-between py-2'>
											<div className='shrink-0 grow-0 text-title1Bold'>
												Payment History
											</div>
											<div className='shrink-0 grow-0 text-title1Bold'>
												<Button
													asChild
													variant='link'
												>
													<Link
														href={`/vehicles/${id}/payments`}
													>
														See all
													</Link>
												</Button>
											</div>
										</div>
										<div className=''>
											<DataTable
												columns={
													paymentColumns
												}
												data={[]}
											/>
										</div>
									</div>
								</>
							)}

							<div className='flex flex-col gap-2 mb-20'>
							<div className='flex justify-between py-2'>
								<div className='shrink-0 grow-0 text-title1Bold'>
									Drivers
								</div>
								<div className='shrink-0 grow-0 text-title1Bold'>
									<Button
										asChild
										variant='link'
									>
										<Link
											href={`/vehicles/${id}/drivers`}
										>
											See all
										</Link>
									</Button>
								</div>
							</div>
							<div className=''>
								<DataTable
									columns={driversColumns}
									data={vehicle.Drivers.slice(0, 3)}
								/>
							</div>
						</div>
						</div>
					)}
				</div> */}
			</div>
		</>
	);
}
