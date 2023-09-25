import { getServerSession } from 'next-auth';
import { API, URLS } from './consts';
import { options } from '@/app/api/auth/options';

export const getSSession = async () => {
	const session = await getServerSession(options);
	return {
		access_token: session?.user.access_token,
		role: session?.user.role,
	};
};

export const getUserMe = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url =
		API +
		(session.role?.toLowerCase() === 'agent'
			? URLS.agent.me
			: URLS.admin.me);
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	if (session.role?.toLowerCase() === 'agent') {
		const data: Promise<IAgentMe> = await res.json();
		const agent = (await data).data.agent;
		return agent;
	} else {
		const data: Promise<IAdminMe> = await res.json();
		const admin = (await data).data.admin;
		return admin;
	}
};

export const getDashboard = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.dashboard;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const data: Promise<IDashboard> = await res.json();
	return data;
};
