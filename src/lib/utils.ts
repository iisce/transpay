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

export function getInitials(name: string): string {
	const words = name.trim().split(' ');

	if (words.length >= 2) {
		const firstInitial = words[0].charAt(0);
		const secondInitial = words[1].charAt(0);
		return `${firstInitial}${secondInitial}`;
	}

	return words[0].charAt(0);
}

/**
 * Takes in a date string and formats it to return a DD-MM-YYYY format date
 * @param {string} inputDate
 * @returns {string}
 */

export function formatDate(inputDate: string): string {
	const date = new Date(inputDate);

	if (isNaN(date.getTime())) {
		return 'Invalid Date';
	}

	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
	const year = date.getFullYear();

	const formattedDate = `${day}-${month}-${year}`;

	return formattedDate;
}

/**
 * Takes a number and returns an Array of numbers matching the star ratings
 * @param {number} number
 * @returns {any}
 */
export function cNTA(number: number): number[] {
	if (number < 0 || number > 5) {
		throw new Error('Input number must be between 0 and 5');
	}

	const array: number[] = [0, 0, 0, 0, 0];

	for (let i = 0; i < 5; i++) {
		if (number >= 1) {
			array[i] = 1;
			number -= 1;
		} else if (number > 0) {
			array[i] = number;
			break;
		}
	}

	return array;
}

export function isUUID(input: string): boolean {
	const uuidPattern =
		/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
	return uuidPattern.test(input);
}
