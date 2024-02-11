import { getDashboardTotalRevenue } from '@/lib/get-data';
import DashboardCard from './dashboard-card';

export default async function YearlyTotalRevenue() {
	const yearlyRevenueTotal = await getDashboardTotalRevenue();
	console.log('yearly total...', yearlyRevenueTotal);
	return (
		<DashboardCard
			type='positive'
			title='Yearly Total Revenue'
			amount={yearlyRevenueTotal || 0}
			percent={0}
			desc='Year Till Date'
		/>
	);
}
