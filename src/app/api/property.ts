import { PROPERTIES } from '@/lib/consts';

export const getProperties = async (): Promise<Partial<IProperty>[]> =>
	PROPERTIES;

export const getPropertyById = async (
	id: string
): Promise<Partial<IProperty> | undefined> =>
	getProperties().then((properties) =>
		properties.find((p) => p.propertyId! === id)
	);
