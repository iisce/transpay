import DashboardCard from '@/components/layout/dashboard-card';
import { CopyButton } from '@/components/shared/copy-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { debtColumns, driversColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getVehicleSummary } from '@/lib/controllers/vehicle-controller';
import { getSSession } from '@/lib/get-data';
import { failureIcon, successIcon } from '@/lib/icons';
import { generateDaysOwedArray } from '@/lib/utils';
import { format } from 'date-fns';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function SearchVehicle({ id }: { id: string }) {
	const { role } = await getSSession();
	const vehicle = await getVehicleSummary(id);
	const onWaiver = vehicle?.status === 'inactive';
	if (!vehicle) {
		notFound();
	}

	const isOwing = vehicle.VehicleBalance?.deficit_balance < 0;
	const dateSupplied = new Date(
		vehicle.VehicleBalance.next_transaction_date.split('T')[0]
	);
	const fee =
		vehicle.category.toLowerCase() === 'keke'
			? '200'
			: vehicle.category === 'small_shuttle'
			? '250'
			: '300';
	// const isOwing = vehicle.VehicleBalance?.deficit_balance < 0;
	// const daysOwed = Array.from

	const daysOwed = generateDaysOwedArray(dateSupplied, fee);
	daysOwed.sort(
		(a, b) =>
			new Date(b.transaction_date).getTime() -
			new Date(a.transaction_date).getTime()
	);
	const totalPendingAmount = daysOwed.reduce(
		(a, b) => a + parseFloat(b.amount),
		0
	);

	return (
		<div className='h-full w-full p-6 flex flex-col gap-6 '>
			<div className='flex flex-col text-center justify-between w-full gap-1'>
				<div className='text-sm'>
					<div className='uppercase'>{`Vehicle Owner`}</div>
					<div className='text-xl font-bold'>
						{vehicle.owners_name}
					</div>
				</div>
				<div className='text-sm uppercase'>
					<div className=''>Plate number</div>
					<div className='text-xl font-bold'>
						{vehicle.plate_number}
					</div>
				</div>
				<div className='text-sm uppercase'>
					<div className=''>Wallet Balance</div>
					<div className='text-xl font-bold text-awesome-foreground'>
						₦
						{vehicle.wallet_balance.available_balance.toFixed(
							2
						)}
					</div>
				</div>
				{vehicle.VehicleBalance && (
					<div
						className={`text-sm uppercase ${
							isOwing
								? 'text-red-500'
								: 'text-awesome-foreground'
						}`}
					>
						<div className=''>Next Payment Date</div>
						<div className='text-xl font-bold '>
							{format(
								new Date(
									vehicle.VehicleBalance.next_transaction_date
								),
								'MMMM d, yyyy'
							)}
						</div>
					</div>
				)}
				{vehicle.VehicleBalance && (
					<div className='text-sm uppercase'>
						<div className=''>Total Payment</div>
						<div className='text-xl font-bold text-awesome-foreground'>
							₦
							{vehicle.VehicleBalance.net_total.toFixed(2)}
						</div>
					</div>
				)}

				{role &&
					vehicle.tracker_id &&
					vehicle.tracker_id !== '' && (
						<Button
							className='w-full max-w-xl mx-auto text-white rounded-xl bg-primary-800'
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
			</div>
			<Tabs
				defaultValue='overview'
				className='w-full max-w-xl mx-auto'
			>
				<TabsList
					className={`grid ${
						isOwing ? 'grid-cols-2' : 'grid-cols-1'
					}`}
				>
					{/* <TabsList className='grid grid-cols-1'> */}
					<TabsTrigger value='overview'>OVERVIEW</TabsTrigger>
					{isOwing && (
						<TabsTrigger value='days-owed'>
							DAYS OWED
						</TabsTrigger>
					)}
				</TabsList>
				<TabsContent value='overview'>
					<Card className='grid gap-2 w-full p-3 bg-secondary text-xs lg:text-base'>
						<div className='uppercase text-center font-bold pb-3'>
							Payment Details
						</div>
						<div className=''>
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
						</div>
						<CopyButton
							label='Copy Account Details'
							text={`${vehicle.VehicleWallet.bank_name} ${vehicle.VehicleWallet.nuban} ${vehicle.VehicleWallet.account_name}`}
						/>
					</Card>
					<div className='w-full'>
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
							<>
								<div className='flex flex-col p-3 w-full items-center gap-2'>
									<div className=' text-red-500'>
										{failureIcon}
									</div>
									<div className='flex flex-col items-center py-2'>
										<div className='shrink-0 grow-0 text-title1Bold'>
											Vehicle is Owing!
										</div>
										<div className='text-destructive-foreground font-bold text-4xl'>
											{`₦${
												totalPendingAmount +
												daysOwed.length * 20
											}`}
											{/* {`₦${-vehicle
												.VehicleBalance
												.deficit_balance}`} */}
										</div>
									</div>
								</div>
							</>
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
				</TabsContent>
				{isOwing && (
					<TabsContent value='days-owed'>
						<div className='w-full grid'>
							<DataTable
								showPagination
								columns={debtColumns}
								data={daysOwed}
							/>
						</div>
					</TabsContent>
				)}
			</Tabs>
			<div className='  w-full'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full'>
					{role && (
						<>
							<DashboardCard
								name='Vehicle Information'
								href={`/vehicles/${vehicle.vehicle_id}/vehicle-info`}
								image={'/personalinfo.png'}
								description={'View Vehicle information'}
							/>

							{role?.toLowerCase() !== 'agent' && (
								<>
									<DashboardCard
										name='Payment'
										href={`/vehicles/${vehicle.vehicle_id}/payments`}
										image={'/payment.png'}
										description={
											'Make Payment & Check Payment History'
										}
									/>

									{/* <DashboardCard
										name='Fines & Penalties'
										href={`/vehicles/${vehicle.vehicle_id}/fines`}
										image={'/fineandpenal.png'}
										description='Fine Driver & Check Fine Payment'
									/> */}
								</>
							)}
							<DashboardCard
								name='Waiver Form'
								href={`/vehicles/${vehicle.vehicle_id}/waiver`}
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
								{/* <div className='flex flex-col gap-2'>
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
													href={`/vehicles/${vehicle.vehicle_id}/fines`}
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
								</div> */}
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
													href={`/vehicles/${vehicle.vehicle_id}/payments`}
												>
													See all
												</Link>
											</Button>
										</div>
									</div>
									<div className=''>
										<DataTable
											columns={debtColumns}
											data={vehicle.VehicleTransactions.slice(
												0,
												3
											)}
										/>
									</div>
								</div>
							</>
						)}

						<div className='flex flex-col gap-2 mb-20'>
							{vehicle.Drivers && (
								<>
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
													href={`/vehicles/${vehicle.vehicle_id}/drivers`}
												>
													See all
												</Link>
											</Button>
										</div>
									</div>
									<div className=''>
										<DataTable
											columns={driversColumns}
											data={vehicle.Drivers.slice(
												0,
												3
											)}
										/>
									</div>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
