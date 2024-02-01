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

export const getDashboard = async (duration?: '1D' | '1M' | '1Y') => {
	try {
		const session = await getSSession();
		const headers = {
			'Content-Type': 'application/json',
			'api-secret': process.env.API_SECRET || '',
			Authorization: `Bearer ${session.access_token}`,
		};
		const url =
			API +
			URLS.dashboard +
			`${duration ? '?period=' + duration : ''}`;
		const res = await fetch(url, { headers, cache: 'no-store' });

		if (!res.ok) {
			// Handle non-2xx HTTP errors
			if (res.status === 429) {
				// Handle 429 (Too Many Requests) error
				console.error(
					'Too Many Requests. Please retry after a while.'
				);
			} else {
				console.error(`HTTP error! Status: ${res.status}`);
			}

			return undefined;
		}

		const data: Promise<IDashboard> = await res.json();
		console.log({ url, data });
		return data;
	} catch (error: any) {
		// Handle other errors (e.g., network issues, JSON parsing errors)
		console.error('An error occurred:', error.message);
		return undefined;
	}
};
