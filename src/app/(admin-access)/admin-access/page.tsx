'use client';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import StepOne from './step-one';
import StepTwo from './step-two';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import DashboardCard from '@/components/role/super-admin/dashboard-card';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { DashboardVehicleSummary } from '@/components/role/super-admin/dashboard-vehicle-summary';
import { DashboardAgentSummary } from '@/components/role/super-admin/dashboard-agent-summary';
import { DashboardDriverSummary } from '@/components/role/super-admin/dashboard-driver-summary';
import { RevenueCharts } from '@/components/shared/chats/revenue-chart';

const sampleVehicle = {
	total: 0,
	active: 0,
	owing: 0,
	cleared: 0,
	onWaivers: 0,
};
const sampleDriver = { total: 0, active: 0, inactive: 0 };
const sampleAgent = { total: 0, active: 0, inactive: 0 };
interface ProtectedPageProps {}

const ProtectedPage: React.FC<ProtectedPageProps> = () => {
	const [pin1, setPin1] = useState('');
	const [pin2, setPin2] = useState('');
	const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Initial, 2: Second PIN, 3: Access granted
	const formattedData = [
		{ name: '12 AM', total: 10497 },
		{ name: '1 AM', total: 478 },
		{ name: '2 AM', total: 6739 },
		{ name: '3 AM', total: 0 },
		{ name: '4 AM', total: 9887 },
		{ name: '5 AM', total: 0 },
		{ name: '6 AM', total: 0 },
		{ name: '7 AM', total: 0 },
		{ name: '8 AM', total: 0 },
		{ name: '9 AM', total: 19898 },
		{ name: '10 AM', total: 0 },
		{ name: '11 AM', total: 0 },
		{ name: '12 PM', total: 0 },
		{ name: '1 PM', total: 0 },
		{ name: '2 PM', total: 11700 },
		{ name: '3 PM', total: 0 },
		{ name: '4 PM', total: 0 },
		{ name: '5 PM', total: 0 },
		{ name: '6 PM', total: 0 },
		{ name: '7 PM', total: 0 },
		{ name: '8 PM', total: 0 },
		{ name: '9 PM', total: 14867 },
		{ name: '10 PM', total: 0 },
		{ name: '11 PM', total: 0 },
	];

	return (
		<div className=''>
			{step === 1 ? (
				<StepOne
					pin1={pin1}
					setPin1={setPin1}
					setStep={setStep}
				/>
			) : step === 2 ? (
				<StepTwo
					pin2={pin2}
					setPin2={setPin2}
					setStep={setStep}
				/>
			) : (
				<>
					<div className='h-16 w-full bg-secondary/60 backdrop-blur-sm shrink-0 '>
						<MaxWidthWrapper className='p-2'>
							<div className='flex items-center justify-between h-full'>
								<Link
									href={'/'}
									className='w-52 shrink-0 px-5'
								>
									<Image
										src={'/logo.png'}
										height={30}
										width={150}
										className='shrink-0'
										alt='Transpay Logo'
									/>
								</Link>
							</div>
						</MaxWidthWrapper>
					</div>
					<MaxWidthWrapper className='p-3 min-h-[100svh] w-full flex flex-col justify-start'>
						<div className='text-2xl uppercase font-bold mb-3'>
							Revenue Summary
						</div>
						<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
							<DashboardCard
								title='Yearly Total Revenue'
								amount={52050}
								desc='Year Till Date'
							/>
							<DashboardCard
								title='Monthly Total Revenue'
								amount={52050}
								desc='Year Till Date'
							/>
							<DashboardCard
								title='Weekly Total Revenue'
								amount={43050}
								desc='Year Till Date'
							/>
							<DashboardCard
								title='Daily Total Revenue'
								amount={0}
								desc='Year Till Date'
							/>
						</div>
						<Separator className='my-5' />
						<div className='text-2xl uppercase font-bold'>
							Tracker Summary
						</div>
						<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
							<DashboardCard
								title='Yearly Total Tracker'
								amount={11100}
								desc='Year Till Date'
							/>
							<DashboardCard
								title='Monthly Total Tracker'
								amount={11100}
								desc='Year Till Date'
							/>
							<DashboardCard
								title='Weekly Total Tracker'
								amount={7800}
								desc='Year Till Date'
							/>
							<DashboardCard
								title='Daily Total Tracker'
								amount={0}
								desc='Year Till Date'
							/>
						</div>
						<Separator className='my-5' />
						<div className='w-full gap-5 grid md:grid-cols-2 lg:grid-cols-3'>
							<DashboardVehicleSummary
								info={sampleVehicle}
							/>
							<DashboardAgentSummary info={sampleAgent} />
							<DashboardDriverSummary
								info={sampleDriver}
							/>
						</div>
						<Separator className='my-5' />
						<div className='bg-secondary p-2 rounded-xl'>
							<RevenueCharts data={formattedData} />
						</div>
					</MaxWidthWrapper>
				</>
			)}
		</div>
	);
};

export default ProtectedPage;
