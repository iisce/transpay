import { NextRequest, NextResponse } from 'next/server';
import { API, URLS } from '@/lib/consts';
import { getSSession } from '@/lib/get-data';

export async function PUT(req: NextRequest) {
	const { access_token } = await getSSession();
	const body: ICreateVehicleForm = await req.json();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${access_token}`,
	};

	try {
		const url = `${API}${URLS.green.all}/${body.vehicle_id}/add-tracker`;
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
