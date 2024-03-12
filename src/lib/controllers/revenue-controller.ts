import { format, subDays, subMonths, subWeeks } from 'date-fns';
import { API, URLS } from '../consts';
import { getSSession } from '../get-data';

export const getRevenueStats = async (
	start?: string,
	end?: string,
	type?: string
) => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const today = new Date();
	const oneMonthAgo = subMonths(today, 1);

	const url = `${API}${URLS.revenue.stats}?start_date=${
		start ?? format(oneMonthAgo, 'yyyy-MM-dd')
	}&end_date=${end ?? format(today, 'yyyy-MM-dd')}${
		type ? '&type=' + type : ''
	}`;
	// console.log({ url, type });
	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();
	if (!res.ok) return undefined;

	const chart: IRevenue = result.data;
	return chart;
};
