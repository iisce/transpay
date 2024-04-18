import { format, subMonths } from 'date-fns';
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
	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();
	console.log({ url, type, result });
	if (!res.ok) return undefined;

	const chart: IRevenue = result.data;
	return chart;
};

export const getDashboardTotalRevenue = async (
	start_date: string,
	end_date: string
) => {
	try {
		const session = await getSSession();
		const headers = {
			'Content-Type': 'application/json',
			'api-secret': process.env.API_SECRET || '',
			Authorization: `Bearer ${session.access_token}`,
		};
		const url = `${API}${URLS.transactions['total-revenue']}?start_date=${start_date}&end_date=${end_date}`;
		const res = await fetch(url, { headers, cache: 'no-store' });
		const result = await res.json();
		console.log({
			start_date,
			end_date,
			url,
			result: result.data,
			error: result.errors,
		});

		if (!result.status || !result.data) {
			console.error(`HTTP error! Status: ${res.status}`);
			return undefined;
		}

		const revenueTotal = result.data;
		return revenueTotal;
	} catch (error: any) {
		// Handle other errors (e.g., network issues, JSON parsing errors)
		console.error('An error occurred:', error.message);
		return undefined;
	}
};

export const getDashboardTotalTracker = async (
	start_date: string,
	end_date: string
) => {
	try {
		const session = await getSSession();
		const headers = {
			'Content-Type': 'application/json',
			'api-secret': process.env.API_SECRET || '',
			Authorization: `Bearer ${session.access_token}`,
		};
		const url = `${API}${URLS.transactions['total-tracker']}?start_date=${start_date}&end_date=${end_date}`;
		const res = await fetch(url, { headers, cache: 'no-store' });
		const result = await res.json();
		console.log({
			start_date,
			end_date,
			url,
			result: result,
			error: result.errors,
		});

		if (!result.status || !result.data) {
			console.error(`HTTP error! Status: ${res.status}`);
			return undefined;
		}

		const trackerTotal = result.data;
		return trackerTotal;
	} catch (error: any) {
		// Handle other errors (e.g., network issues, JSON parsing errors)
		console.error('An error occurred:', error.message);
		return undefined;
	}
};
