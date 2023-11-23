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
	console.log(url, session.access_token, process.env.API_SECRET);
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;

	console.log(res.json());
	const data: Promise<IAdminMe> = await res.json();
	const admin = (await data).data.admin;
	return admin;
};
