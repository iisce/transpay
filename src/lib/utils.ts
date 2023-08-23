import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function gupn(objects: Record<string, any>[]): string[] {
	const uniquePropertyNames: string[] = [];

	for (const obj of objects) {
		for (const propertyName in obj) {
			if (!uniquePropertyNames.includes(propertyName)) {
				uniquePropertyNames.push(propertyName);
			}
		}
	}

	return uniquePropertyNames;
}
