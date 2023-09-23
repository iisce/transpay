import { getServerSession } from 'next-auth';
import { API, URLS } from './consts';
import { options } from '@/app/api/auth/options';

const getAccessToken = async () => {
	const session = await getServerSession(options);
	return session?.user.access_token;
};

export const getDashboard = async () => {
	const accessToken = await getAccessToken();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${accessToken}`,
	};
	const url = API + URLS.dashboard;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const data: Promise<IDashboard> = await res.json();
	// console.log('Dashboard Data ...', data);
	// console.log('API URL ...', url); //
	return data;
};
