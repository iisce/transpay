import { API, URLS } from '../consts';
import { getSSession } from '../get-data';
import { isBarcodeId, isURL, isUUID } from '../utils';

export const runtime = 'edge'; // 'nodejs' is the default
export const dynamic = 'force-dynamic';

export const getVehicles = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.vehicle.all;
	console.log({ url, session });
	const res = await fetch(url, { headers, cache: 'no-store' });
	const data: Promise<IVehicles> = await res.json();
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

	const result = await res.json();
	const vehicle: IVehicle = result.data;
	return vehicle;
};

// export const getVehicleSummary = async (plate_number: string) => {
// 	const headers = {
// 		'Content-Type': 'application/json',
// 	};
// 	const url = isUUID(plate_number)
// 		? `${API}${URLS.vehicle.all}/summary?id=${plate_number}`
// 		: isBarcodeId(plate_number)
// 		? `${API}${URLS.vehicle.all}/summary?barcode=${plate_number}`
// 		: `${API}${URLS.vehicle.all}/summary?plate_number=${plate_number}`;
// 	const res = await fetch(url, { headers, cache: 'no-store' });

// 	console.log({ vehiclesummary: await res.json() });
// 	if (!res.ok) return undefined;

// 	const result = await res.json();
// 	const summary: IVehicleSummary = result;
// 	return summary;
// };

export const getVehicleSummary = async (plate_number: string) => {
	const headers = {
		'Content-Type': 'application/json',
	};

	let url;
	if (isUUID(plate_number)) {
		url = `${API}${URLS.vehicle.all}/summary?id=${plate_number}`;
	} else if (isBarcodeId(plate_number)) {
		url = `${API}${URLS.vehicle.all}/summary?barcode=${plate_number}`;
	} else {
		url = `${API}${URLS.vehicle.all}/summary?plate_number=${plate_number}`;
	}

	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();

	console.log({ vehicleSummary: result });

	if (!res.ok) {
		return undefined;
	}

	const summary: IVehicleSummary = result;
	return summary;
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
	console.log({ url, result: await res.json() });
	if (!res.ok) return undefined;
	const result = await res.json();
	const vehicle = result.data;
	return vehicle;
};
