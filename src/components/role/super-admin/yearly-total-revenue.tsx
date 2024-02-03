import { getDashboardTotalRevenue } from '@/lib/get-data';
import DashboardCard from './dashboard-card';

export default async function YearlyTotalRevenue() {
	const yearlyRevenueTotal = await getDashboardTotalRevenue();
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
