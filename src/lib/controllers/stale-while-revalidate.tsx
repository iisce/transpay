import useSWR from 'swr';
import { API, URLS } from '../consts';
import { getSSession } from '../get-data';

const url = API + URLS.settings;

const fetcher = (url: string, token: string) =>
	fetch(url, {
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
			'api-secret': process.env.API_SECRET || '',
		},
	}).then((res) => res.json());

export async function useSwrSettings() {
	const { access_token } = await getSSession();
	const { data } = useSWR<ISettings[]>(
		url,
		await fetcher(url, access_token!)
	);
	return data;
}
