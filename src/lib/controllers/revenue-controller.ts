import { format, subDays } from 'date-fns';
import { API, URLS } from '../consts';
import { getSSession } from '../get-data';

export const getRevenueStats = async (start?: string, end?: string) => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const today = new Date();
	const oneWeekAgo = subDays(today, 7);

	const url = `${API}${URLS.revenue.stats}?start_date=${
		start ?? format(oneWeekAgo, 'yyyy-MM-dd')
	}&end_date=${end ?? format(today, 'yyyy-MM-dd')}`;
	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();
	console.log({ url, result });
	if (!res.ok) return undefined;

	const chart: IRevenue = result.data;
	return chart;
};
