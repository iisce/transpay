import { format, subMonths } from 'date-fns';
import { API, TRANSACTION_TYPE, URLS } from '../consts';
import { getSSession } from '../get-data';

export const getRevenueStats = async (
	start?: string,
	end?: string,
	type?: 'DAILY_FEES' | 'ALL' | 'TRACKER_FEES'
) => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const today = new Date();
	const oneMonthAgo = subMonths(today, 1);

	const url = `${API}${
		type === 'ALL'
			? URLS.transactions['net-total']
			: type === 'DAILY_FEES'
			? URLS.transactions['total-revenue']
			: URLS.transactions['total-tracker']
	}?start_date=${start ?? format(oneMonthAgo, 'yyyy-MM-dd')}&end_date=${
		end ?? format(today, 'yyyy-MM-dd')
	}`;
	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();
	console.log({ result, type });
	if (!res.ok) return undefined;

	const total: number = result.data;
	return total;
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
