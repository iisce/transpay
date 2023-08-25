interface Payment {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
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

interface FinesCardP{
	title: string;
	description: string;
	type: 'fine'| 'penalty';
	href: string;
	amount: string|number
}

interface ButtonF{
	text: string;
	icon?: React.ReactNode;
	variant: 'primary' | 'secondary';
	hasIcon?: boolean;
	onClick?: () => void;
	className?: string;
}