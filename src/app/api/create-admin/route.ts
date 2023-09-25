import { NextRequest, NextResponse } from 'next/server';
import { API, URLS } from '@/lib/consts';
import { getSSession } from '@/lib/get-data';

export async function POST(req: NextRequest) {
	const { access_token } = await getSSession();
	const body: ICreateAdminForm = await req.json();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${access_token}`,
	};

	try {
		const url = API + URLS.admin.all;
		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				name: body.name,
				email: body.email,
				password: body.password,
				phone: body.phone,
				role: body.role,
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
