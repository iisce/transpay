import { clsx, type ClassValue } from 'clsx';
import {
	differenceInDays,
	differenceInMonths,
	differenceInWeeks,
	differenceInYears,
	format,
	startOfYear,
	subYears,
	getHours,
	startOfDay,
	addHours,
	addDays,
	isEqual,
} from 'date-fns';
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

/**
 * Checks if a string is a valid UUID
 * @param {string} input
 * @returns {boolean}
 */
export function isUUID(input: string): boolean {
	const uuidPattern =
		/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
	return uuidPattern.test(input);
}

/**
 * Description
 * @param {string} str
 * @returns {boolean}
 */
export function isBarcodeId(str: string): boolean {
	const formatRegex = /^\d{13}$/;
	return formatRegex.test(str);
}

/**
 * Description
 * @param {string} text
 * @returns {any}
 */
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
export function transformTransactionsToYearsData(
	transactions: IVehicleTransaction[]
): { name: string; total: number }[] {
	const totalByYear: { [year: string]: number } = {};

	transactions.forEach((transaction: IVehicleTransaction) => {
		const transactionDate = new Date(transaction.transaction_date);
		const year = transactionDate.getFullYear().toString(); // Get the full year

		// Initialize total for the year if not present
		if (!totalByYear[year]) {
			totalByYear[year] = 0;
		}

		// Add transaction amount to the total for the year
		totalByYear[year] += transaction.amount;
	});

	// Convert totalByYear object to the required format
	const transformedData: { name: string; total: number }[] = Object.entries(
		totalByYear
	).map(([year, total]) => ({
		name: year,
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
// export function transformTransactionsToWeeksData(
// 	transactions: IVehicleTransaction[]
// ): { name: string; total: number }[] {
// 	const totalByWeek: { [week: string]: number } = {};

// 	transactions.forEach((transaction: IVehicleTransaction) => {
// 		const transactionDate = new Date(transaction.transaction_date);
// 		const weekNumber = getWeekNumber(transactionDate);
// 		const weekKey = `Week ${weekNumber}`;
// 		if (!totalByWeek[weekKey]) {
// 			totalByWeek[weekKey] = 0;
// 		}
// 		totalByWeek[weekKey] += transaction.amount;
// 	});
// 	const transformedData: { name: string; total: number }[] = Object.entries(
// 		totalByWeek
// 	).map(([week, total]) => ({
// 		name: week,
// 		total,
// 	}));
// 	return transformedData;
// }

export function transformTransactionsToWeeksData(
	transactions: IVehicleTransaction[]
): { name: string; total: number }[] {
	const totalByWeek: { [weekKey: string]: number } = {};

	transactions.forEach((transaction) => {
		const transactionDate = new Date(transaction.transaction_date);

		// Get the ISO week number (1-52/53) considering year rollover
		const weekNumber = getWeekNumber(transactionDate);
		const year = transactionDate.getFullYear().toString();

		// Combine year and week for unique key
		const weekKey = `week ${weekNumber}-${year}`;

		// Initialize total for the week if not present
		if (!totalByWeek[weekKey]) {
			totalByWeek[weekKey] = 0;
		}

		// Add transaction amount to the total for the week
		totalByWeek[weekKey] += transaction.amount;
	});

	// Convert totalByWeek object to the required format
	const transformedData: { name: string; total: number }[] = Object.entries(
		totalByWeek
	).map(([weekKey, total]) => ({
		name: weekKey,
		total,
	}));

	return transformedData;
}

// export function transformTransactionsToDaysData(
// 	transactions: IVehicleTransaction[]
// ): { name: string; total: number }[] {
// 	const totalByDay: { [day: string]: number } = {};

// 	transactions.forEach((transaction: IVehicleTransaction) => {
// 		console.log({
// 			date: format(
// 				new Date(transaction.transaction_date),
// 				'yyyy-MM-dd'
// 			),
// 			amount: transaction.amount,
// 		});
// 		const transactionDate = new Date(transaction.transaction_date);
// 		// Using the transaction date directly as the key
// 		const dayKey = format(new Date(transactionDate), 'dd-mm');

// 		if (!totalByDay[dayKey]) {
// 			totalByDay[dayKey] = 0;
// 		}
// 		totalByDay[dayKey] += transaction.amount;
// 	});

// 	const transformedData: { name: string; total: number }[] = Object.entries(
// 		totalByDay
// 	).map(([day, total]) => ({
// 		name: day,
// 		total,
// 	}));

// 	return transformedData;
// }

export function transformTransactionsToDaysData(
	transactions: IVehicleTransaction[]
): { name: string; total: number }[] {
	// 1. Get the range of days
	const earliestTransaction = transactions.reduce((min, t) =>
		new Date(t.transaction_date) < new Date(min.transaction_date)
			? t
			: min
	);
	const latestTransaction = transactions.reduce((max, t) =>
		new Date(t.transaction_date) > new Date(max.transaction_date)
			? t
			: max
	);

	let currentDate = startOfDay(
		new Date(earliestTransaction.transaction_date)
	);
	const endDate = startOfDay(new Date(latestTransaction.transaction_date));

	// 2. Initialize the daily data
	const dailyData: { name: string; total: number }[] = [];
	while (currentDate <= endDate) {
		dailyData.push({
			name: format(currentDate, 'MMM d'), // Format like 'Mar 10'
			total: 0,
		});
		currentDate = addDays(currentDate, 1);
	}

	// 3. Aggregate transactions into daily buckets
	transactions.forEach((t) => {
		const transactionDate = startOfDay(new Date(t.transaction_date));
		const matchingDay = dailyData.find((d) =>
			isEqual(transactionDate, new Date(d.name))
		);
		if (matchingDay) {
			matchingDay.total += t.amount;
		}
	});

	return dailyData;
}

export function transformTransactionsToHoursData(
	transactions: IVehicleTransaction[]
): { name: string; total: number }[] {
	let hourlyData: { name: string; total: number }[] = [];
	// 1. Get the start of the day from the earliest transaction
	if (transactions.length !== 0) {
		const earliestTransaction = transactions.reduce((min, t) =>
			new Date(t.transaction_date) < new Date(min.transaction_date)
				? t
				: min
		);
		const startOfChartDay = startOfDay(
			new Date(earliestTransaction.transaction_date)
		);

		// 2. Initialize the hourly data
		for (let i = 0; i < 24; i++) {
			const hourStart = addHours(startOfChartDay, i);
			hourlyData.push({
				name: format(hourStart, 'h a'), // Format like '9 AM', '10 AM', etc.
				total: 0,
			});
		}

		// 3. Aggregate transactions into hourly buckets
		transactions.forEach((t) => {
			const transactionHour = getHours(new Date(t.transaction_date));
			hourlyData[transactionHour].total += t.amount;
		});

		return hourlyData;
	}

	return hourlyData;
}

export function isUuid(input: string): boolean {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

	return uuidRegex.test(input);
}

export function isURL(str: string): boolean {
	const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
	return urlRegex.test(str);
}

export const checkEnvironment = () => {
	let base_url =
		process.env.NODE_ENV === 'development'
			? 'http://localhost:8726'
			: 'https://transpay.vercel.app/';

	return base_url;
};

export function generateRandomLocation(): {
	lat: number;
	lng: number;
} {
	const minlat: number = 6.0233;
	const maxlat: number = 6.2322;
	const minLng: number = 7.0733;
	const maxLng: number = 7.2822;

	// Generate random lat and lng
	const lat: number = parseFloat(
		(Math.random() * (maxlat - minlat) + minlat).toFixed(6)
	);
	const lng: number = parseFloat(
		(Math.random() * (maxLng - minLng) + minLng).toFixed(6)
	);

	return { lat, lng };
}

export function generateRandomInteger(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calculateTransactionTotals(
	transactions: IVehicleTransaction[]
): {
	totalRevenue: number;
	totalDailyFees: number;
	totalTrackerFees: number;
} {
	let totalRevenue = 0;
	let totalDailyFees = 0;
	let totalTrackerFees = 0;

	transactions.forEach((transaction: IVehicleTransaction) => {
		totalRevenue += transaction.amount;

		if (transaction.transaction_type === 'DAILY_FEES') {
			totalDailyFees += transaction.amount;
		} else if (transaction.transaction_type === 'TRACKER_FEES') {
			totalTrackerFees += transaction.amount;
		}
	});

	return {
		totalRevenue,
		totalDailyFees,
		totalTrackerFees,
	};
}

export function calculatePercentageDifference(
	lastYearTotals: number,
	newYearTotals: number
): number {
	if (lastYearTotals === 0) {
		return 0;
	}

	return ((newYearTotals - lastYearTotals) / lastYearTotals) * 100;
}

export function filterTransactionsByDateRange(
	transactions: IVehicleTransaction[],
	startDate: Date,
	endDate: Date
): IVehicleTransaction[] {
	return transactions.filter((transaction) => {
		const transactionDate = new Date(transaction.transaction_date);
		return transactionDate >= startDate && transactionDate <= endDate;
	});
}

// Set last year dynamically
export const LAST_YEAR_START_DATE = subYears(startOfYear(new Date()), 1); // Start of last year
export const LAST_YEAR_END_DATE = new Date(
	startOfYear(new Date()).getTime() - 1
);
export const NEW_YEAR_START_DATE = startOfYear(new Date()); // Start of current year

export const createDataForTable = (transactions: IVehicleTransaction[]) => {
	const yearlyTotals: { [year: string]: number } = {};

	transactions.forEach((transaction: IVehicleTransaction) => {
		const transactionDate = new Date(transaction.transaction_date);
		const transactionYear = transactionDate.getFullYear().toString();

		if (!yearlyTotals[transactionYear]) {
			yearlyTotals[transactionYear] = 0;
		}

		yearlyTotals[transactionYear] += transaction.amount;
	});

	const dataForTable = Object.entries(yearlyTotals).map(([year, total]) => ({
		name: year,
		total,
	}));

	return dataForTable;
};
interface DaysOwedObject {
	transaction_date: string;
	amount: string;
	transaction_type: string;
}

export function generateDaysOwedArray(
	dateSupplied: Date,
	fee: '200' | '250' | '300'
): DaysOwedObject[] {
	const presentDate = new Date();
	const timeDiff = Math.ceil(
		(dateSupplied.getTime() - presentDate.getTime()) /
			(1000 * 60 * 60 * 24)
	);

	const daysOwedArray: DaysOwedObject[] = [];

	for (let i = 0; i <= -timeDiff; i++) {
		const transactionDate = new Date(presentDate);
		transactionDate.setDate(presentDate.getDate() + timeDiff + i);

		const daysOwedObject: DaysOwedObject = {
			transaction_date: transactionDate.toISOString().split('T')[0],
			amount: fee, // Replace with the actual amount
			transaction_type: 'DAILY_FEES',
		};

		daysOwedArray.push(daysOwedObject);
	}
	return daysOwedArray;
}

export function compareDates(
	date1: string,
	date2: string
): 'daily' | 'weekly' | 'monthly' | 'yearly' | 'hourly' {
	const parsedDate1 = new Date(date1);
	const parsedDate2 = new Date(date2);

	// Calculate differences using date-fns for accuracy and convenience
	const daysDifference = differenceInDays(parsedDate2, parsedDate1);
	const weeksDifference = differenceInWeeks(parsedDate2, parsedDate1);
	const monthsDifference = differenceInMonths(parsedDate2, parsedDate1);
	const yearsDifference = differenceInYears(parsedDate2, parsedDate1);

	if (daysDifference < 2) {
		return 'hourly';
	} else if (daysDifference <= 31) {
		return 'daily';
	} else if (weeksDifference <= 16) {
		return 'weekly';
	} else if (monthsDifference <= 12) {
		return 'monthly';
	} else {
		return 'yearly';
	}
}

export function isEmpty(value: string | any[] | object): boolean {
	if (typeof value === 'string') {
		return value.trim() === '';
	} else if (Array.isArray(value)) {
		return value.length === 0;
	} else if (typeof value === 'object' && value !== null) {
		return Object.keys(value).length === 0;
	} else {
		throw new Error('Unsupported type for isEmpty check');
	}
}
