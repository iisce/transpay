import { BASE_URL } from '../consts';

export const dynamic = 'force-dynamic';

export const getMyVehicles = async (fields?: string, limit?: number) => {
	const url = `${BASE_URL}/api/vehicles${fields ? '?fields=' + fields : ''}`;
	const res = await fetch(url, { cache: 'no-store' });
	const data: Promise<Partial<IVehicle[]>> = await res.json();
	console.log({ data });
	if (!res.ok) return undefined;
	const vehicles = data;
	return vehicles;
};
