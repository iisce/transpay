import { NextRequest, NextResponse } from 'next/server';
import { API, URLS } from '@/lib/consts';
import { getSSession } from '@/lib/get-data';
import { waiverFormValues } from '@/components/forms/new-waiver-form';

export async function POST(req: NextRequest) {
	const { access_token } = await getSSession();
	const body: waiverFormValues = await req.json();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${access_token}`,
	};

	const payload = {
		reason: body.reason,
		additional_info: '',
		image: '',
		start_date: body.start_date,
		end_date: body.end_date,
	};
	const url = API + URLS.vehicle.all + '/' + body.id + '/add-waiver';
	console.log('create-waiver api endpoint... ', { payload, body, url });
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify({ payload }),
		});

		const result = await response.json();
		console.log('result from create-waiver api endpoint...', result);
		if (!response.ok) {
			throw new Error(`Something Went wrong ${response.statusText}`);
		} else {
			return NextResponse.json(result);
		}
	} catch (error: any) {
		return error?.message;
	}
}

// export async function PUT(req: NextRequest) {
// 	const { access_token } = await getSSession();
// 	const body: ICreateVehicleForm = await req.json();
// 	const headers = {
// 		'Content-Type': 'application/json',
// 		'api-secret': process.env.API_SECRET || '',
// 		Authorization: `Bearer ${access_token}`,
// 	};

// 	try {
// 		const url = `${API}${URLS.vehicle.all}/${body.vehicle_id}`;
// 		const response = await fetch(url, {
// 			method: 'PUT',
// 			headers,
// 			body: JSON.stringify(body),
// 		});
// 		const result = await response.json();
// 		// console.log({
// 		// 	RESULT: result,
// 		// 	URL: url,
// 		// 	BODY: body,
// 		// });
// 		if (!response.ok) {
// 			throw new Error(`Something Went wrong ${response.statusText}`);
// 		} else {
// 			return NextResponse.json(result);
// 		}
// 	} catch (error: any) {
// 		return error?.message;
// 	}
// }

// export async function DELETE(req: NextRequest) {
// 	const { access_token } = await getSSession();
// 	const body: ICreateVehicleForm = await req.json();
// 	const headers = {
// 		'Content-Type': 'application/json',
// 		'api-secret': process.env.API_SECRET || '',
// 		Authorization: `Bearer ${access_token}`,
// 	};

// 	try {
// 		const url = `${API}${URLS.vehicle.all}/${body.vehicle_id}`;
// 		const response = await fetch(url, {
// 			method: 'DELETE',
// 			headers,
// 		});
// 		const result = await response.json();
// 		if (!response.ok) {
// 			throw new Error(`Something Went wrong ${response.statusText}`);
// 		} else {
// 			return NextResponse.json(result);
// 		}
// 	} catch (error: any) {
// 		return error?.message;
// 	}
// }
