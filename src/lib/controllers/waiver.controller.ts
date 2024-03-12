import { API, URLS } from '../consts';
import { isBarcodeId, isUUID } from '../utils';
import { getVehicleSummary } from './vehicle-controller';

export const getVehicleWaiverProtected = async (plate_number: string) => {
	const headers = {
		'Content-Type': 'application/json',
	};

	let url;
	let id;
	if (isUUID(plate_number) || isBarcodeId(plate_number)) {
		const vehicle = await getVehicleSummary(plate_number);
		id = vehicle?.vehicle_id;
	}
	url = `${API}${URLS.vehicle.all}/${id}/waiver?page=1&limit=10`;

	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();

	if (!res.ok) {
		return undefined;
	}

	const waiver: IWaiverResponse = result.data;
	return waiver;
};
export const getVehicleWaiver = async (plate_number: string) => {
	const headers = {
		'Content-Type': 'application/json',
	};

	let url;
	let id;
	if (isUUID(plate_number) || isBarcodeId(plate_number)) {
		const vehicle = await getVehicleSummary(plate_number);
		id = vehicle?.vehicle_id;
	}
	url = `${API}${URLS.vehicle.all}/${id}/waiver/recent`;

	const res = await fetch(url, { headers, cache: 'no-store' });
	const result = await res.json();

	if (!res.ok) {
		return undefined;
	}

	const waiver: IWaiverResponse = result.data;
	return waiver;
};
