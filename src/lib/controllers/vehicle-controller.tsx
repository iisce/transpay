import { API, URLS } from '../consts';
import { getSSession } from '../get-data';
import { isBarcodeId, isURL, isUUID } from '../utils';

export const getVehicles = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.vehicle.all;
	const res = await fetch(url, { headers, cache: 'no-store' });
	const data: Promise<IVehicles> = await res.json();
	console.log(data);
	if (!res.ok) return undefined;
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

export const getVehicleSummary = async (plate_number: string) => {
	const headers = {
		'Content-Type': 'application/json',
	};
	const url = isUUID(plate_number)
		? `${API}${URLS.vehicle.all}/summary?id=${plate_number}`
		: isBarcodeId(plate_number)
		? `${API}${URLS.vehicle.all}/summary?barcode=${plate_number}`
		: `${API}${URLS.vehicle.all}/summary?plate_number=${plate_number}`;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const result: Promise<PrettyVehicleSummary> = await res.json();
	const { data } = await result;
	// console.log({
	// 	RESULT: result,
	// 	ID: plate_number,
	// 	URL: url,
	// 	HEADERS: headers,
	// 	DATA: data.vehicle,
	// });

	if (!data) return undefined;
	return data.vehicle;
};

export const searchVehicle = async (id: string) => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};

	const url = isUUID(id)
		? `${API}${URLS.vehicle.search}?id=${id}`
		: `${API}${URLS.vehicle.search}?plate_number=${id}`;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const result: Promise<IResVehicle> = (await res.json()).data;
	const { vehicle } = await result;
	return vehicle;
};
