import DashboardCard from '@/components/layout/dashboard-card';
import { Button } from '@/components/ui/button';
import { viewDriversColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { DRIVER_TABLE, VIEWDRIVER_TABLE } from '@/lib/consts';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';

export default function ViewDriverDetails({ plate }: { plate: string }) {
	const vehicle = DRIVER_TABLE.find((driver) => driver.plate === plate);

	if (vehicle) {
		return (
			<div className='h-full w-full p-6 flex flex-col gap-6 '>
				<div className='flex items-center justify-between'>
					<div className='text-title1Bold'>{vehicle.name}</div>
					<Button
						className='justify-start  text-white rounded-xl bg-primary-800'
						asChild
						variant={'default'}
					>
						<Link
							href={`/dashboard/drivers/${plate}/fines`}
							className='shrink-0 whitespace-nowrap'
						>
							<div className='mr-2 h-4 w-4 shrink-0'>
								{addIcon}
							</div>
							Fine Driver
						</Link>
					</Button>
				</div>
				<div className='overflow-y-scroll  w-full'>
					<div className='flex flex-wrap gap-5 w-full'>
						<DashboardCard
							name='Vehicle Information'
							href={`${plate}/vehicle-info`}
							image={'/personalinfo.png'}
							description={'View Vehicle information'}
						/>
						<DashboardCard
							name='Payment'
							href={`${plate}/payments`}
							image={'/payment.png'}
							description={
								'Make Payment & Check Payment History'
							}
						/>
						<DashboardCard
							name='Fines & Penalties'
							href={`${plate}/fines`}
							image={'/fineandpenal.png'}
							description='Fine Driver & Check Fine Payment'
						/>
						<DashboardCard
							name='Waiver Form'
							href={`${plate}/fines`}
							image={'/fineandpenal.png'}
							description='Fill waiver form to process driver grace period'
						/>
					
					</div>
					<div className='flex flex-col gap-5'>
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
											href={`/dashboard/drivers/${plate}/fines`}
										>
											See all
										</Link>
									</Button>
								</div>
							</div>
							<div className=''>
								<DataTable
									columns={viewDriversColumns}
									data={VIEWDRIVER_TABLE.slice(0, 3)}
								/>
							</div>
						</div>
						<div className='flex flex-col gap-2 mb-20'>
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
											href={`/dashboard/drivers/${plate}/payments`}
										>
											See all
										</Link>
									</Button>
								</div>
							</div>
							<div className=''>
								<DataTable
									columns={viewDriversColumns}
									data={VIEWDRIVER_TABLE.slice(0, 3)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className='h-full p-6 flex flex-col gap-6 '>
				<div className='text-title1Bold'>
					<h2>VEHICLE DOES NOT EXIST</h2>
				</div>
			</div>
		);
	}
}
