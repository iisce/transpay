import { NextRequest, NextResponse } from 'next/server';
import { API, URLS } from '@/lib/consts';
import { getSSession } from '@/lib/get-data';

export async function POST(req: NextRequest) {
	const { access_token } = await getSSession();
	const body: ICreateAgentForm = await req.json();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${access_token}`,
	};

	try {
		const url = API + URLS.agent.all;
		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				name: body.name,
				password: body.password,
				phone: body.phone,
				email: body.email,
				identification_type: body.identification_type,
				identification_number: body.identification_number,
				role: body.role,
				location: body.location,
				city: body.city,
				country: body.country,
				postcode: body.postcode,
			}),
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
	const body: ICreateAgentForm = await req.json();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${access_token}`,
	};

	try {
		const url = `${API}${URLS.agent.all}/${body.agent_id}`;
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
	const body: ICreateAgentForm = await req.json();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${access_token}`,
	};

	try {
		const url = `${API}${URLS.agent.all}/${body.agent_id}`;
		const response = await fetch(url, {
			method: 'DELETE',
			headers,
		});
		const result = await response.json();
		if (!result.success) {
			return NextResponse.json(result);
		} else {
			return NextResponse.json(result);
		}
	} catch (error: any) {
		return error?.message;
	}
}
