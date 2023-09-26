import { API, URLS } from '../consts';
import { getSSession } from '../get-data';

export const getAgentMe = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.agent.me;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;

	const data: Promise<IAgentMe> = await res.json();
	const agent = (await data).data.agent;
	return agent;
};

export const getAgents = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.agent.all;
	const res = await fetch(url, { headers, next: { revalidate: 0 } });
	if (!res.ok) return undefined;
	const data: Promise<IAgents> = await res.json();
	const agents = (await data).data.agents;
	return agents;
};

export const getAgentById = async (id: string) => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = `${API}${URLS.agent.all}/${id}`;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const result: Promise<IResAgent> = (await res.json()).data;
	const { agent } = await result;
	return agent;
};

export const deleteAgentById = async (id: string) => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = `${API}${URLS.agent.all}/${id}`;
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
