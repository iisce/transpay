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

	try {
		const url = API + URLS.vehicles.all;
		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				category: body.category,
				color: body.color,
				image: body.image,
				plate_number: body.plate_number,
				status: body.status,
			}),
		});

		const result = await response.json();
		console.log(result);
		console.log(url);
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
