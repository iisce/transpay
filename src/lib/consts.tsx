import {
	agentsIcon,
	dashboardIcon,
	driverIcon,
	finesIcon,
	heavyVehiclesIcon,
	peopleIcon,
	revenueIcon,
} from './icons';

export const SIDEBAR_LINKS = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: dashboardIcon,
	},
	{
		name: 'Agents',
		href: '/dashboard/agents',
		icon: agentsIcon,
	},
	{
		name: 'Drivers',
		href: '/dashboard/drivers',
		icon: driverIcon,
	},
	{
		name: 'Heavy Vehicles',
		href: '/dashboard/heavy-vehicles',
		icon: heavyVehiclesIcon,
	},
	{
		name: 'Fines & Penalties',
		href: '/dashboard/fines',
		icon: finesIcon,
	},
	{
		name: 'Revenue',
		href: '/dashboard/revenue',
		icon: revenueIcon,
	},
];

export const DASHBOARD_CARD = [
	{
		name: 'Drivers',
		description: 'Drivers list & Update',
		icon: peopleIcon,
		number: '2,500',
		href: '/dashboard/drivers',
		image: '/tricycle.jpg',
	},
	{
		name: 'Agents',
		description: 'Agents List',
		icon: peopleIcon,
		number: '1,500',
		href: '/dashboard/agents',
		image: '/tricycle.jpg',
	},
	{
		name: 'Companies & trucks',
		description: 'Company Vehicle Registration & Heavy Vehicles',
		icon: '',
		number: '',
		href: '/dashboard/heavy-vehicles',
		image: '/tricycle.jpg',
	},
	{
		name: 'Fines & Penalties',
		description: 'Create fines & penalties',
		icon: '',
		number: '',
		href: '/dashboard/fines',
		image: '/tricycle.jpg',
	},
	{
		name: 'Revenue and Stats',
		description: 'View Money raised and submitted.',
		icon: '',
		number: '',
		href: '/dashboard/revenue',
		image: '/tricycle.jpg',
	},
];
