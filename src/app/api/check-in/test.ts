import { slugify } from '@/lib/utils';
import { ALL_VEHICLES } from '../../../../data';

export const getVehicles = async (): Promise<IVehicle[]> => ALL_VEHICLES;

export const getProductById = async (
	id: string
): Promise<IVehicle | undefined> =>
	getVehicles().then((vehicles) =>
		vehicles.find((p) => slugify(p.plate_number) === id)
	);
