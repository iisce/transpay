interface Payment {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
}
interface AgentPayment {
	id: string;
	driver: string;
	amount: number;
	date: string;
	payment_type: 'Cash' | 'Transfer' | 'Bank Transfer' | 'Mobile Transfer';
	status: 'pending' | 'processing' | 'successful' | 'failed';
}
interface DriverPayment {
	id: string;
	driver: string;
	amount: number;
	date: string;
	payment_type: 'Cash' | 'Transfer' | 'Bank Transfer' | 'Mobile Transfer';
	status: 'pending' | 'processing' | 'successful' | 'failed';
}
interface DriverT{
	name: string;
	phone_number: number;
}

interface AdminT {
	id: string;
	name: string;
	contact: {
		email: string;
		phone: string;
	};
	status: 'active' | 'inactive';
	address: string;
}
interface AgentT {
	id: string;
	name: string;
	phone: string;
	status: 'active' | 'inactive';
	area: string;
}

interface DriverT {
	id: string;
	name: string;
	plate: string;
	status: 'active' | 'inactive';
	category: string;
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	showSearch?: boolean;
	showColumns?: boolean;
	searchWith?: string;
	showPagination?: boolean;
}

interface Framework {
	value: string;
	label: string;
}
interface DashboardCardI {
	name: string;
	description: string;
	href: Url;
	number?: string;
	icon?: React.ReactNode;
	image?: string;
	className?: string;
}
interface FinesCardP {
	id?: number;
	title: string;
	description: string;
	type: 'fine' | 'penalty';
	amount: number;
}
interface ButtonF {
	text: string;
	icon?: React.ReactNode;
	variant: 'primary' | 'secondary';
	hasIcon?: boolean;
	onClick?: () => void;
	className?: string;
}

interface USERI {
	user: {
		name: string;
		role:
			| 'super admin'
			| 'admin'
			| 'waiver'
			| 'onboarding'
			| 'compliance';
		avatar: string;
		email: string;
	};
}

interface ADBCI {
	title: string;
	amount: number;
	type: 'positive' | 'negative' | 'neutral';
	percent: number;
}

interface ACTIVITIESI {
	id: number;
	name: string;
	time: string;
	date: string;
}

interface IDashboard {
	data: {
		pages: {
			title: string;
			description: string;
			total: number;
		}[];
		summary: {
			revenue: {
				months: any[];
				names: any[];
				changes: any[];
			};
		};
	};
}
