import { getDashboardTotalYearlyRevenue } from '@/lib/get-data';
import DashboardCard from './dashboard-card';

export default async function YearlyTotalTracker() {
	const yearlyRevenueTotal = await getDashboardTotalYearlyRevenue(
		'TRACKER_FEES'
	);
	return (
		<DashboardCard
			type='positive'
			title='Yearly Total Tracker'
			amount={yearlyRevenueTotal || 0}
			percent={0}
			desc='Year Till Date'
		/>
	);
}
