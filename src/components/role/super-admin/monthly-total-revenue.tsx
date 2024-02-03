import { getDashboardTotalMonthlyRevenue } from '@/lib/get-data';
import DashboardCard from './dashboard-card';

export default async function MonthlyTotalRevenue() {
	const monthlyRevenueTotal = await getDashboardTotalMonthlyRevenue();
	return (
		<DashboardCard
			type='positive'
			title='Monthly Total Revenue'
			amount={monthlyRevenueTotal || 0}
			percent={0}
			desc='Month Till Date'
		/>
	);
}
