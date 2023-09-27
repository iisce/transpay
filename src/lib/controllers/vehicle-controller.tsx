import { API, URLS } from '../consts';
import { getSSession } from '../get-data';

export const getVehicles = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.vehicle.all;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const data: Promise<IVehicles> = await res.json();
	const vehicles = (await data).data.vehicles;
	return vehicles;
};

export const getVehicleById = async (id: string) => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = `${API}${URLS.vehicle.all}/${id}`;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const result: Promise<IResVehicle> = (await res.json()).data;
	const { vehicle } = await result;
	return vehicle;
};
export const searchVehicle = async (id: string) => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = `${API}${URLS.vehicle.search}?plate_number=${id}`;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const result: Promise<IResVehicle> = (await res.json()).data;
	const { vehicle } = await result;
	return vehicle;
};
