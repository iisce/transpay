import { API, URLS } from '../consts';
import { getSSession } from '../get-data';

export const getAdminMe = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.admin.me;
	const res = await fetch(url, { headers, cache: 'no-store' });
	const data: Promise<IAdminMe> = await res.json();
	if (!res.ok) return undefined;

	const admin = (await data).data.admin;
	return admin;
};

export const getAdmins = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.admin.all;
	const res = await fetch(url, { headers, next: { revalidate: 0 } });
	if (!res.ok) return undefined;
	const data: Promise<IAdmins> = await res.json();
	const admins = (await data).data.admins;
	return admins;
};

export const getAdminById = async (id: string) => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = `${API}${URLS.admin.all}/${id}`;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const result: Promise<IResAdmin> = (await res.json()).data;
	const { admin } = await result;
	return admin;
};

export const deleteAdminById = async (id: string) => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = `${API}${URLS.admin.all}/${id}`;
	const res = await fetch(url, {
		method: 'delete',
		headers,
		cache: 'no-store',
	});
	if (!res.ok) return undefined;
	const data = await res.json();
	const response = await data;
	return response;
};
