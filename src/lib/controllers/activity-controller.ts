import { API, URLS } from '../consts';
import { getSSession } from '../get-data';

export const getAllActivities = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.activity.all;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;

	const data: Promise<IActivity[]> = await res.json();
	const activities = await data;
	return activities;
};
