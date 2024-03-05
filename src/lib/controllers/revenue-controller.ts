import { API, URLS } from '../consts';
import { getSSession } from '../get-data';

export const getRevenueStats = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.revenue.stats;
	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();
	if (!res.ok) return undefined;

	const chart: IRevenue = result.data;
	return chart;
};
