import { format, subMonths } from 'date-fns';
import { getServerSession } from 'next-auth';
import { API, URLS } from '../consts';

export const getAllTransactions = async (
	start?: string,
	end?: string,
	type?: 'DAILY_FEES' | 'ALL' | 'TRACKER_FEES'
) => {
	const session = await getServerSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session?.user.access_token}`,
	};

	const url = `${API}${URLS.transactions.all}`;
	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();
	console.log({
		url,
		type,
		result: result.data.rows,
		error: result?.errors?.message,
	});
	if (!res.ok) return undefined;

	const total: {
		rows: ITransaction[];
		meta: { total: number; total_pages: number; page: number };
	} = result.data;
	return total;
};
