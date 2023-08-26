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
	status: 'pending' | 'processing' | 'successful' | 'failed';
}

interface AgentT {
	id: string;
	name: string;
	phone: string;
	status: 'active' | 'inactive';
	area: string;
}

interface AgentT {
	id: string;
	name: string;
	phone: string;
	status: 'active' | 'inactive';
	area: string;
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	showSearch?: boolean;
	showColumns?: boolean;
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
}
interface ButtonD {
	text: string;
	icon?: React.ReactNode;
	variant: 'primary' | 'secondary';
	hasIcon?: boolean;
	onClick?: () => void;
	className?: string;
}
