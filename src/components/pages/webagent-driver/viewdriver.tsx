import DashboardCard from '@/components/layout/dashboard-card';
import { Button } from '@/components/ui/button';
import { viewDriversColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import {
	DRIVER_TABLE,
	VIEWDRIVER_TABLE,
	WEBAGENTDRIVER_CARD,
} from '@/lib/consts';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';

export default function WebAgentViewDriverDetails({
	plate,
}: {
	plate: string;
}) {
	const vehicle = DRIVER_TABLE.find((vehicle) => vehicle.plate === plate);
	return (
		<div className='h-full p-6 flex flex-col gap-6 '>
			<div className='flex justify-between'>
				<div className='text-title1Bold py-6'>
					<h2>{vehicle?.name}</h2>
				</div>
				<div className='shrink-0 grow-0'>
					<Button
						className='justify-start  text-white rounded-xl bg-primary-800'
						asChild
						variant={'default'}
					>
						<Link
							href={'/web-agent/fine'}
							className='shrink-0 whitespace-nowrap'
						>
							<div className='mr-2 h-4 w-4 shrink-0'>
								{addIcon}
							</div>
							Fine Driver
						</Link>
					</Button>
				</div>
			</div>

			<div className=' overflow-y-scroll'>
				<div className='flex flex-row gap-6 rounded-3xl'>
					{WEBAGENTDRIVER_CARD.map((card: DashboardCardI, i) => (
						<DashboardCard
							key={i}
							name={card.name}
							href={card.href}
							image={card.image}
							description={card.description}
						/>
					))}
				</div>
				<div className='flex flex-col gap-5'>
					<div className='flex flex-col gap-2 mb-20'>
						<div className='flex justify-between py-2'>
							<div className='shrink-0 grow-0 text-title1Bold'>
								Fine History
							</div>
							<div className='shrink-0 grow-0 text-title1Bold'>
								<Link
									href={'/web-agent/driver/fines'}
									className='text-primary-800 underline'
								>
									See all
								</Link>
							</div>
						</div>
						<div className=''>
							<DataTable
								columns={viewDriversColumns}
								data={VIEWDRIVER_TABLE}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-2 mb-20'>
						<div className='flex justify-between py-2'>
							<div className='shrink-0 grow-0 text-title1Bold'>
								History
							</div>
							<div className='shrink-0 grow-0 text-title1Bold'>
								<Link
									href={'/'}
									className='text-primary-800 underline'
								>
									See all
								</Link>
							</div>
						</div>
						<div className=''>
							<DataTable
								columns={viewDriversColumns}
								data={VIEWDRIVER_TABLE}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
