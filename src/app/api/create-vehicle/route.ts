import { NextRequest, NextResponse } from 'next/server';
import { API, URLS } from '@/lib/consts';
import { getSSession } from '@/lib/get-data';

export async function POST(req: NextRequest) {
	const { access_token } = await getSSession();
	const body: ICreateVehicleForm = await req.json();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${access_token}`,
	};
	const payload = {
		category: body.category,
		color: body.color,
		image: body.image,
		plate_number: body.plate_number,
		status: body.status,
		vehicle_type: body.vehicle_type,
		owners_phone_number: body.owners_phone_number,
		owners_name: body.owners_name,
		with_wallet: body.with_wallet,
		vin: body.vin,
		barcode_string: body.barcode_string,
		tracker_id: body.tracker_id,
	};
	console.log({ payload });

	try {
		const url = API + URLS.vehicle.all;
		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(payload),
		});

		const result = await response.json();
		if (!response.ok) {
			throw new Error(`Something Went wrong ${response.statusText}`);
		} else {
			return NextResponse.json(result);
		}
	} catch (error: any) {
		return error?.message;
	}
}

export async function PUT(req: NextRequest) {
	const { access_token } = await getSSession();
	const body: ICreateVehicleForm = await req.json();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${access_token}`,
	};

	try {
		const url = `${API}${URLS.vehicle.all}/${body.vehicle_id}`;
		const response = await fetch(url, {
			method: 'PUT',
			headers,
			body: JSON.stringify(body),
		});
		const result = await response.json();

		if (!response.ok) {
			throw new Error(`Something Went wrong ${response.statusText}`);
		} else {
			return NextResponse.json(result);
		}
	} catch (error: any) {
		return error?.message;
	}
}

export async function DELETE(req: NextRequest) {
	const { access_token } = await getSSession();
	const body: ICreateVehicleForm = await req.json();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${access_token}`,
	};

	try {
		const url = `${API}${URLS.vehicle.all}/${body.vehicle_id}`;
		const response = await fetch(url, {
			method: 'DELETE',
			headers,
		});
		const result = await response.json();
		if (!response.ok) {
			throw new Error(`Something Went wrong ${response.statusText}`);
		} else {
			return NextResponse.json(result);
		}
	} catch (error: any) {
		return error?.message;
	}
}
