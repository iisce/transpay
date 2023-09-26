import { API, URLS } from '@/lib/consts';
import { getSSession } from '@/lib/get-data';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
	const { access_token } = await getSSession();
	const body: ICreateDriverForm = await req.json();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${access_token}`,
	};

	try {
		const url = `${API}${URLS.vehicle.all}/${body.driver_id}/driver`;
		const response = await fetch(url, {
			method: 'PUT',
			headers,
			body: JSON.stringify({
				name: body.name,
				email: body.email,
				phone: body.phone,
				address: body.address,
				city: body.city,
				lga: body.lga,
				identification_type: body.identification_type,
				identification_number: body.identification_number,
				is_active: body.is_active,
			}),
		});
		const result = await response.json();
		if (!response.ok) {
			throw new Error(`Something Went wrong ${response.statusText}`);
		} else {
			return NextResponse.json(result);
		}
	} catch (error: any) {
		console.log(error?.message);
		return error?.message;
	}
}
