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

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/ /g, '-') // Replace spaces with hyphens
		.replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric characters
		.replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
		.replace(/^-|-$/g, ''); // Remove leading and trailing hyphens
}

export function unslugify(slug: string): string {
	const words = slug.split('-');
	const final = words.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	return final.join(' ');
}
export function transformTransactionsToMonthsData(
	transactions: IVehicleTransaction[]
): { name: string; total: number }[] {
	const totalByMonth: { [month: string]: number } = {};

	transactions.forEach((transaction: IVehicleTransaction) => {
		const transactionDate = new Date(transaction.transaction_date);
		const monthName = transactionDate.toLocaleString('en-US', {
			month: 'short',
		});

		// Initialize total for the month if not present
		if (!totalByMonth[monthName]) {
			totalByMonth[monthName] = 0;
		}

		// Add transaction amount to the total for the month
		totalByMonth[monthName] += transaction.amount;
	});

	// Convert totalByMonth object to the required format
	const transformedData: { name: string; total: number }[] = Object.entries(
		totalByMonth
	).map(([month, total]) => ({
		name: month,
		total,
	}));

	return transformedData;
}
function getWeekNumber(date: Date): number {
	const startOfYear = new Date(date.getFullYear(), 0, 1);
	const diffInDays = Math.floor(
		(date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
	);
	const weekNumber = Math.ceil((diffInDays + startOfYear.getDay() + 1) / 7);
	return weekNumber;
}
export function transformTransactionsToWeeksData(
	transactions: IVehicleTransaction[]
): { name: string; total: number }[] {
	const totalByWeek: { [week: string]: number } = {};

	transactions.forEach((transaction: IVehicleTransaction) => {
		const transactionDate = new Date(transaction.transaction_date);
		const weekNumber = getWeekNumber(transactionDate);
		const weekKey = `Week ${weekNumber}`;
		if (!totalByWeek[weekKey]) {
			totalByWeek[weekKey] = 0;
		}
		totalByWeek[weekKey] += transaction.amount;
	});
	const transformedData: { name: string; total: number }[] = Object.entries(
		totalByWeek
	).map(([week, total]) => ({
		name: week,
		total,
	}));
	return transformedData;
}
export function isUuid(input: string): boolean {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

	return uuidRegex.test(input);
}
