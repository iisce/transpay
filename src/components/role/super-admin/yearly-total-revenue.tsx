import { getDashboardTotalYearlyRevenue } from '@/lib/get-data';
import DashboardCard from './dashboard-card';

export default async function YearlyTotalRevenue() {
	const yearlyRevenueTotal = await getDashboardTotalYearlyRevenue(
		'DAILY_FEES'
	);
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
