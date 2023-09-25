import {
	adminIcon,
	agentDriverIcon,
	agentsIcon,
	dashboardIcon,
	driverIcon,
	finesIcon,
	peopleIcon,
	revenueIcon,
	scanIcon,
	homeIcon,
	profileIcon,
	securityIcon,
	aboutIcon,
	searchIcon,
} from './icons';

export const SIDEBAR_LINKS = [
	{
		title: 'Dashboard',
		href: '/dashboard',
		icon: dashboardIcon,
	},
	{
		title: 'Admins',
		href: '/admins',
		icon: adminIcon,
	},
	{
		title: 'Agents',
		href: '/agents',
		icon: agentsIcon,
	},
	{
		title: 'Vehicles',
		href: '/vehicles',
		icon: driverIcon,
	},
	{
		title: 'Fines & Penalties',
		href: '/fines',
		icon: finesIcon,
	},
	{
		title: 'Scan',
		href: '/scan',
		icon: scanIcon,
	},
	{
		title: 'Revenue',
		href: '/revenue',
		icon: revenueIcon,
	},
];
export const SIDEBAR_LINKS_ADMIN = [
	{
		title: 'Dashboard',
		href: '/dashboard',
		icon: dashboardIcon,
	},
	{
		title: 'Agents',
		href: '/agents',
		icon: agentsIcon,
	},
	{
		title: 'Vehicles',
		href: '/vehicles',
		icon: driverIcon,
	},
	{
		title: 'Fines & Penalties',
		href: '/fines',
		icon: finesIcon,
	},
	{
		title: 'Scan',
		href: '/scan',
		icon: scanIcon,
	},
];

export const SIDEBAR_LINKS_AGENT = [
	{
		title: 'Dashboard',
		href: '/dashboard',
		icon: dashboardIcon,
	},
	{
		title: 'Vehicles',
		href: '/vehicles',
		icon: driverIcon,
	},
	{
		title: 'Scan',
		href: '/scan',
		icon: scanIcon,
	},
];

export const MANAGE_SIDEBAR_LINKS = [
	{
		name: 'Home',
		href: '/manage',
		icon: homeIcon,
	},
	{
		name: 'My Profile',
		href: '/manage/profile',
		icon: profileIcon,
	},
	{
		name: 'Security',
		href: '/manage/security',
		icon: securityIcon,
	},
	{
		name: 'About Us',
		href: '/manage/about',
		icon: aboutIcon,
	},
];

export const DRIVERS_CARD = [
	{
		name: 'Personal Information',
		description: 'Edit Drivers information',
		href: '/vehicles',
		image: '/personalinfo.png',
	},
	{
		name: 'Payment',
		description: 'Make Payment & Check Payment History',
		href: '/revenue',
		image: '/payment.png',
	},
	{
		name: 'Fines & Penalties',
		description: 'Fine Driver & Check Fine Payment',
		href: '/fines',
		image: '/fineandpenal.png',
	},
];

export const DASHBOARD_CARD = [
	{
		name: 'Agents',
		description: 'Agents List',
		icon: peopleIcon,
		number: '500',
		href: '/agents',
		image: '/tricycle.jpg',
	},
	{
		name: 'Vehicles',
		description: 'Drivers list & Update',
		icon: peopleIcon,
		number: '9,200',
		href: '/vehicles',
		image: '/tricycle.jpg',
	},
	{
		name: 'Fines & Penalties',
		description: 'Create fines & penalties',
		icon: finesIcon,
		number: '10,000',
		href: '/fines',
		image: '/tricycle.jpg',
	},
	{
		name: 'Scan Plate',
		description:
			'Scan Driver Plate to retrieve drivers information plate',
		icon: '',
		number: '',
		href: '/scan',
		image: '/scanplate.png',
	},
	{
		name: 'Revenue and Stats',
		description: 'View Money raised and submitted.',
		icon: '',
		number: '',
		href: '/revenue',
		image: '/tricycle.jpg',
	},
];

export const AGENT_DASHBOARD_CARD = [
	{
		name: 'Vehicles',
		description: 'Drivers list & Update',
		icon: peopleIcon,
		number: '9,200',
		href: '/vehicles',
		image: '/tricycle.jpg',
	},
	{
		name: 'Fines & Penalties',
		description: 'Create fines & penalties',
		icon: finesIcon,
		number: '10,000',
		href: '/fines',
		image: '/tricycle.jpg',
	},
	{
		name: 'Scan Plate',
		description:
			'Scan Driver Plate to retrieve drivers information plate',
		icon: '',
		number: '',
		href: '/scan',
		image: '/scanplate.png',
	},
];

export const AGENT_TABLE = [
	{
		name: 'Emeka Ignatius',
		area: 'Agege',
		phone: '08061719533',
		status: 'active',
	},
	{
		name: 'Emmanuel Ozigbo',
		area: 'Festac',
		phone: '08061719533',
		status: 'inactive',
	},
	{
		name: 'Agent 1',
		area: 'Agege',
		phone: '08065543210',
		status: 'active',
	},
	{
		name: 'Agent 2',
		area: 'Festac',
		phone: '08062345678',
		status: 'inactive',
	},
	{
		name: 'Agent 3',
		area: 'Ikeja',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 4',
		area: 'Surulere',
		phone: '08064321098',
		status: 'inactive',
	},
	{
		name: 'Agent 5',
		area: 'Lekki',
		phone: '08063456789',
		status: 'active',
	},
	{
		name: 'Agent 6',
		area: 'Ajao Estate',
		phone: '08060987654',
		status: 'inactive',
	},
	{
		name: 'Agent 7',
		area: 'Yaba',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 8',
		area: 'Oshodi',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent 9',
		area: 'Ikoyi',
		phone: '08064321987',
		status: 'active',
	},
	{
		name: 'Agent 10',
		area: 'Victoria Island',
		phone: '08063456781',
		status: 'inactive',
	},
	{
		name: 'Agent 11',
		area: 'Maryland',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 12',
		area: 'Ikorodu',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent 13',
		area: 'Gbagada',
		phone: '08064321987',
		status: 'active',
	},
	{
		name: 'Agent 14',
		area: 'Magodo',
		phone: '08063456781',
		status: 'inactive',
	},
	{
		name: 'Agent 15',
		area: 'Sangotedo',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 16',
		area: 'Egbeda',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent 17',
		area: 'Apapa',
		phone: '08064321987',
		status: 'active',
	},
	{
		name: 'Agent 18',
		area: 'Ijebu Ode',
		phone: '08063456781',
		status: 'inactive',
	},
	{
		name: 'Agent 19',
		area: 'Akoka',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 20',
		area: 'Mushin',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent 21',
		area: 'Ikeja',
		phone: '08064321987',
		status: 'active',
	},
	{
		name: 'Agent 22',
		area: 'Ajao Estate',
		phone: '08063456781',
		status: 'inactive',
	},
	{
		name: 'Agent 23',
		area: 'Yaba',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 24',
		area: 'Oshodi',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent 25',
		area: 'Ikoyi',
		phone: '08064321987',
		status: 'active',
	},
	{
		name: 'Agent 26',
		area: 'Victoria Island',
		phone: '08063456781',
		status: 'inactive',
	},
	{
		name: 'Agent 27',
		area: 'Maryland',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 28',
		area: 'Ikorodu',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent 29',
		area: 'Gbagada',
		phone: '08064321987',
		status: 'active',
	},
	{
		name: 'Agent 30',
		area: 'Magodo',
		phone: '08063456781',
		status: 'inactive',
	},
	{
		name: 'Agent 31',
		area: 'Sangotedo',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 32',
		area: 'Egbeda',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent 33',
		area: 'Apapa',
		phone: '08064321987',
		status: 'active',
	},
	{
		name: 'Agent 34',
		area: 'Ijebu Ode',
		phone: '08063456781',
		status: 'inactive',
	},
	{
		name: 'Agent 35',
		area: 'Akoka',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 36',
		area: 'Mushin',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent 37',
		area: 'Festac',
		phone: '08064321987',
		status: 'active',
	},
	{
		name: 'Agent 38',
		area: 'Agege',
		phone: '08063456781',
		status: 'inactive',
	},
	{
		name: 'Agent 39',
		area: 'Lekki',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 40',
		area: 'Surulere',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent A',
		area: 'Ikeja',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent B',
		area: 'Yaba',
		phone: '08064321987',
		status: 'inactive',
	},
	{
		name: 'Agent C',
		area: 'Surulere',
		phone: '08063456781',
		status: 'active',
	},
	{
		name: 'Agent D',
		area: 'Oshodi',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent E',
		area: 'Lekki',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent F',
		area: 'Ikoyi',
		phone: '08064321987',
		status: 'inactive',
	},
	{
		name: 'Agent G',
		area: 'Ajao Estate',
		phone: '08063456781',
		status: 'active',
	},
	{
		name: 'Agent H',
		area: 'Festac',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent I',
		area: 'Victoria Island',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent J',
		area: 'Agege',
		phone: '08064321987',
		status: 'inactive',
	},
	{
		name: 'Agent K',
		area: 'Ikorodu',
		phone: '08063456781',
		status: 'active',
	},
	{
		name: 'Agent L',
		area: 'Magodo',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent M',
		area: 'Maryland',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent N',
		area: 'Egbeda',
		phone: '08064321987',
		status: 'inactive',
	},
	{
		name: 'Agent O',
		area: 'Gbagada',
		phone: '08063456781',
		status: 'active',
	},
	{
		name: 'Agent P',
		area: 'Apapa',
		phone: '08067654321',
		status: 'inactive',
	},
	{
		name: 'Agent Q',
		area: 'Mushin',
		phone: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent R',
		area: 'Akoka',
		phone: '08064321987',
		status: 'inactive',
	},
	{
		name: 'Agent S',
		area: 'Ijebu Ode',
		phone: '08063456781',
		status: 'active',
	},
	{
		name: 'Agent T',
		area: 'Sangotedo',
		phone: '08067654321',
		status: 'inactive',
	},
];

export const DRIVER_TABLE = [
	{
		name: 'Emeka Ignatius',
		plate: 'tfgh-ilt',
		status: 'active',
		category: 'cleared',
	},
	{
		name: 'Emmanuel Ozigbo',
		plate: 'trhb6-9jw',
		status: 'inactive',
		category: 'debtors',
	},
	{
		name: 'Divine Onyekachukwu',
		plate: 'gtw8-owg',
		status: 'waived',
		category: 'debtors',
	},
	{
		name: 'Oyeniran Ayobami',
		plate: '97yy-kjy',
		status: 'active',
		category: 'cleared',
	},
];

export const PAYMENT_TABLE = [
	{
		driver: 'Emeka Ignatius',
		amount: '1,500',
		date: '11/08/23',
		status: 'successful',
	},
	{
		driver: 'Emmanuel Ozigbo',
		amount: '3,000',
		date: '11/08/23',
		status: 'processing',
	},
	{
		driver: 'Divine Onyekachukwu',
		amount: '8,392',
		date: '11/08/23',
		status: 'pending',
	},
	{
		driver: 'Divine Onyekachukwu',
		amount: '8,392',
		date: '11/08/23',
		status: 'pending',
	},
	{
		driver: 'Divine Onyekachukwu',
		amount: '8,392',
		date: '11/08/23',
		status: 'pending',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
	{
		driver: 'Oyeniran Ayobami',
		amount: '6,793',
		date: '11/08/23',
		status: 'failed',
	},
];

export const VIEW_DRIVER_TABLE = [
	{
		Date: '23-08-2023',
		amount_NGN: '15000',
		payment_type: 'Cash',
		handled_by: 'Agent john',
	},
	{
		Date: '22-08-2023',
		amount_NGN: '10000',
		payment_type: 'Bank Transfer',
		handled_by: 'Agent James',
	},
	{
		Date: '24-08-2023',
		amount_NGN: '25000',
		payment_type: 'Cash',
		handled_by: 'Agent Jane',
	},
	{
		Date: '21-08-2023',
		amount_NGN: '60,000',
		payment_type: 'Mobile Transfer',
		handled_by: 'Agent Janet',
	},
	{
		Date: '23-08-2023',
		amount_NGN: '5000',
		payment_type: 'Cash',
		handled_by: 'Agent Jonathan',
	},
	{
		Date: '25-08-2023',
		amount_NGN: '19000',
		payment_type: 'Cash',
		handled_by: 'Agent Helen',
	},
	{
		Date: '25-08-2023',
		amount_NGN: '19000',
		payment_type: 'Cash',
		handled_by: 'Agent Helen',
	},
	{
		Date: '25-08-2023',
		amount_NGN: '19000',
		payment_type: 'Cash',
		handled_by: 'Agent Helen',
	},
	{
		Date: '25-08-2023',
		amount_NGN: '19000',
		payment_type: 'Cash',
		handled_by: 'Agent Helen',
	},
];

export const ADD_DRIVER_TABLE = [
	{
		Name: 'Okechukwu John',
		Phone_Number: '09078398045',
	},
	{
		Name: 'Ikechukwu Jonathan',
		Phone_Number: '09078398048',
	},
	{
		Name: 'Tobechukwu Tony',
		Phone_Number: '09078398047',
	},
	{
		Name: 'Godson Alfred',
		Phone_Number: '09078398075',
	},
	{
		Name: 'Godwin Emmanuel',
		Phone_Number: '09078399045',
	},
	{
		Name: 'Micheal Thomas',
		Phone_Number: '09078398065',
	},
	{
		Name: 'Abraham Pius',
		Phone_Number: '09078398985',
	},
	{
		Name: 'Anthony Wilson',
		Phone_Number: '09078398095',
	},
	{
		Name: 'Obi Moses',
		Phone_Number: '09078398105',
	},
];

// WEB AGENT
export const WEB_AGENT_SIDEBAR_LINKS = [
	{
		name: 'Dashboard',
		href: '/web-agent',
		icon: dashboardIcon,
	},
	{
		name: 'Scan',
		href: '/web-agent/scan',
		icon: scanIcon,
	},
	{
		name: 'Driver',
		href: '/web-agent/driver',
		icon: agentDriverIcon,
	},
];

export const WEB_AGENT_CARD = [
	{
		name: 'Scan Plate',
		description:
			'Scan Driver Plate to retrieve drivers information plate',
		icon: '',
		number: '',
		href: '/web-agent/scan',
		image: '/scanplate.png',
	},

	{
		name: 'Drivers',
		description: 'Drivers list & Update',
		icon: peopleIcon,
		number: '2,500',
		href: '/web-agent/driver',
		image: '/drivers.png',
	},
];

export const WEB_AGENT_DRIVER_CARD = [
	{
		name: 'Vehicle Information',
		description: 'View Vehicle information',
		href: '/web-agent/driver/editinfo',
		image: '/personalinfo.png',
	},
	{
		name: 'Payment',
		description: 'Make Payment & Check Payment History',
		href: '/web-agent/driver/payment',
		image: '/payment.png',
	},
	{
		name: 'Fines & Penalties',
		description: 'Fine Driver & Check Fine Payment',
		href: '/web-agent/driver/plate/fines',
		image: '/fineandpenal.png',
	},
	{
		name: 'Waiver Form',
		description: 'Fill waiver form to process driver grace period.',
		href: '/web-agent',
		image: '/fineandpenal.png',
	},
];

export const FINE_CARDS: FinesCardP[] = [
	{
		id: 0,
		title: 'Speeding',
		description: 'Exceeding the speed limit on the highway.',
		type: 'fine',
		amount: 10000, // Amount in Nigerian Naira
	},
	{
		id: 1,
		title: 'Driving without License',
		description: "Operating a vehicle without a valid driver's license.",
		type: 'fine',
		amount: 8000,
	},
	{
		id: 2,
		title: 'Running Red Light',
		description: 'Passing through a red traffic light signal.',
		type: 'fine',
		amount: 12000,
	},
	{
		id: 3,
		title: 'Overloading Vehicle',
		description: 'Carrying more passengers or goods than allowed.',
		type: 'fine',
		amount: 15000,
	},
	{
		id: 4,
		title: 'Using Mobile While Driving',
		description:
			'Using a mobile phone without a hands-free device while driving.',
		type: 'fine',
		amount: 5000,
	},
	{
		id: 5,
		title: 'Unauthorized Parking',
		description: 'Parking in a no-parking zone or blocking traffic.',
		type: 'fine',
		amount: 7000,
	},
	{
		id: 6,
		title: 'Operating Vehicle without Insurance',
		description: 'Driving a vehicle without valid insurance coverage.',
		type: 'fine',
		amount: 10000,
	},
	{
		id: 7,
		title: 'Driving Under the Influence',
		description: 'Driving while intoxicated by alcohol or drugs.',
		type: 'fine',
		amount: 20000,
	},
];

// ADMINS PAGE
export const ADMINS_TABLE = [
	{
		id: '0',
		name: 'Emeka Ignatius',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '123-456-7890',
		},
		address: '1st avenue idumota road',
		status: 'active',
	},
	{
		id: '1',
		name: 'Emmanuel Ozigbo',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08061719533',
		},
		address: 'frank way 2nd plot 2435',
		status: 'inactive',
	},
	{
		id: '2',
		name: 'Agent 1',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08065543210',
		},
		address: 'estherwill street',
		status: 'active',
	},
	{
		id: '3',
		name: 'Agent 2',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08062345678',
		},
		address: 'fege road',
		status: 'inactive',
	},
	{
		id: '4',
		name: 'Agent 3',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08061234567',
		},
		address: 'Upper Iweka road plot 6574',
		status: 'active',
	},
	{
		id: '5',
		name: 'Agent 4',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08064321098',
		},
		address: 'Main Market Onitsha',
		status: 'inactive',
	},
	{
		name: 'Agent 5',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 6',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08060987654',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 7',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 8',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 9',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 10',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 11',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 12',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 13',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 14',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 15',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 16',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 17',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 18',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 19',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 20',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 21',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 22',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 23',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent 24',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 25',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 26',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 27',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 28',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 29',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 30',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 31',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 32',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 33',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 34',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 35',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 36',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 37',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 38',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent 39',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent 40',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent A',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent B',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent C',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent D',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent E',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: '08061234567',
		status: 'active',
	},
	{
		name: 'Agent F',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent G',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent H',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent I',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent J',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent K',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent L',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent M',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent N',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent O',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent P',
		contact: {
			'emekaignatius5@gmail.com': '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent Q',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent R',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
	{
		name: 'Agent S',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'active',
	},
	{
		name: 'Agent T',
		contact: {
			email: 'emekaignatius5@gmail.com',
			phone: '08063456789',
		},
		address: 'Awada, okiki street, flat 3 block 18',
		status: 'inactive',
	},
];

export const PERSONAL_INFORMATION = [
	{
		title: 'Name',
		entry: 'Isaac Emperor',
	},
	{
		title: 'E-mail Address',
		entry: 'IsaacEmperor@gmail.com',
	},
	{
		title: 'Phone Number',
		entry: '080-332-7264',
	},
];

export const ADDRESS_INFORMATION = [
	{
		title: 'Address',
		entry: 'No, 14 Agbero Road, Anambra',
	},
	{
		title: 'Area Location',
		entry: 'Mile 1-3',
	},
];

export const LOGIN_DETAILS = [
	{
		title: 'User ID',
		entry: 'AgentISCE',
	},
	{
		title: 'Password',
		entry: 'IsaacE2000',
	},
];

export const WAIVER_HISTORY = [
	{
		timeline: 'Jan 31 - Feb 20',
		reason: 'Car Repair',
		status: 'active',
		generated_by: 'Agent Emeka 1',
	},
	{
		timeline: 'May 21 - June 1',
		reason: 'Car Repair',
		status: 'inactive',
		generated_by: 'Agent Leo1',
	},
	{
		timeline: 'Dec 31 - Jan 20',
		reason: 'Car Repair',
		status: 'inactive',
		generated_by: 'Agent Divine1',
	},
	{
		timeline: 'Oct 31 - Nov 20',
		reason: 'Car Repair',
		status: 'inactive',
		generated_by: 'Agent Emeka 1',
	},
	{
		timeline: 'Jan 31 - Feb 20',
		reason: 'Car Repair',
		status: 'active',
		generated_by: 'Agent Emeka 1',
	},
	{
		timeline: 'Jan 31 - Feb 20',
		reason: 'Car Repair',
		status: 'active',
		generated_by: 'Agent Emeka 1',
	},
	{
		timeline: 'Jan 31 - Feb 20',
		reason: 'Car Repair',
		status: 'inactive',
		generated_by: 'Agent Emeka 1',
	},
	{
		timeline: 'Jan 31 - Feb 20',
		reason: 'Car Repair',
		status: 'inactive',
		generated_by: 'Agent Emeka 1',
	},
	{
		timeline: 'Jan 31 - Feb 20',
		reason: 'Car Repair',
		status: 'inactive',
		generated_by: 'Agent Emeka 1',
	},
	{
		timeline: 'Jan 31 - Feb 20',
		reason: 'Car Repair',
		status: 'active',
		generated_by: 'Agent Divine1',
	},
	{
		timeline: 'May 15 - June 13',
		reason: 'Car Repair',
		status: 'active',
		generated_by: 'Agent Leo1',
	},
];

export const API = 'https://squid-app-ruxoz.ondigitalocean.app';

export const URLS = {
	admin: {
		all: '/api/v1/admins',
		me: '/api/v1/admins/me',
	},
	agent: {
		all: '/api/v1/agents',
		me: '/api/v1/agents/me',
	},
	auth: {
		signin: {
			admin: '/api/v1/admins/login',
			agent: '/api/v1/agents/login',
		},
	},
	dashboard: '/api/v1/dashboard',
	vehicles: {
		all: '/api/v1/vehicles', // GET for all, POST to create
		single: '/api/v1/vehicles', // Get by ID, Include /${vehicleId}
		blacklist: '/api/v1/vehicles/blacklist', // add vehicle to blacklist
	},
};

export const BUS_IMAGE_SAMPLE =
	'https://images.unsplash.com/photo-1616792577902-f1d86383a21b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2803&q=80';
