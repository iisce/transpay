import { getServerSession } from 'next-auth';
import { API, URLS } from '../consts';
import { options } from '@/app/api/auth/options';

export const getAllActivities = async () => {
	const session = await getServerSession(options);
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session?.user.access_token}`,
	};
	const url = API + URLS['audit-trails'].all;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const result = await res.json();
	console.log({ result: result.data });
	const activities: {
		rows: IActivity[];
		meta: { total: number; total_pages: number; page: number };
	} = result.data;
	return activities;
};
export const getActivitiesByUser = async () => {
	const session = await getServerSession(options);
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session?.user.access_token}`,
	};
	const url = API + URLS['audit-trails'].user;
	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();
	if (!res.ok) return undefined;
	console.log({ url, result });
	const activities: {
		rows: IActivity[];
		meta: { total: number; total_pages: number; page: number };
	} = await result;
	return activities;
};
export const getActivitiesByVehicle = async () => {
	const session = await getServerSession(options);
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session?.user.access_token}`,
	};
	const url = API + URLS['audit-trails'].vehicle;
	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();
	console.log({ url, result });
	if (!res.ok) return undefined;
	const activities: {
		rows: IActivity[];
		meta: { total: number; total_pages: number; page: number };
	} = await result;
	return activities;
};
