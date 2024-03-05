import { ALL_VEHICLES } from '../../../../data';
import { sql } from '@vercel/postgres';
import { checkEnvironment } from '@/lib/utils';

export const getVehicles = async (): Promise<IInterStateVehicle[]> =>
	ALL_VEHICLES;

export async function getVehicleByPlate(
	plate: string
): Promise<IInterStateVehicle | undefined> {
	try {
		const v = await fetch(
			checkEnvironment().concat(`/api/check-in?plate=${plate}`),
			{ cache: 'no-store' }
		);
		const vehicle = await v.json();
		// console.log(vehicle.v);
		return vehicle.v;
	} catch (error) {
		console.error('Failed to fetch Vehicle:', error);
		throw new Error('Failed to fetch Vehicle.');
	}
}

export async function checkInOut(plate: string) {
	const v = await fetch(
		checkEnvironment().concat(`/api/check-in?plate=${plate}`),
		{ cache: 'no-store' }
	);
	const vehicle = await v.json();
	const now = new Date();
	if (!v) return undefined;

	if (!vehicle.v.ischeckedin) {
		try {
			await sql`
				UPDATE interstate
				SET checkintime = ${now}, ischeckedin = ${true}
				WHERE plate = ${plate}
			`;
			const updatedV = await getVehicleByPlate(plate);
			return updatedV;
		} catch (error) {
			return undefined;
		}
	} else
		try {
			await sql`
				UPDATE interstate
				SET checkouttime = ${now}, ischeckedin = ${false}
				WHERE plate = ${plate}
			`;

			const updatedV = await getVehicleByPlate(plate);
			return updatedV;
		} catch (error) {
			return undefined;
		}
}
