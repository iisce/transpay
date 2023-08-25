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
<<<<<<< HEAD

interface FinesCardP{
	title: string;
	description: string;
	type: 'fine'| 'penalty';
	href: string;
	amount: string|number
}

interface ButtonF{
=======
interface ButtonD{
>>>>>>> 1c8482753dce764f99b40e5f2dd8d5e73f9ebe75
	text: string;
	icon?: React.ReactNode;
	variant: 'primary' | 'secondary';
	hasIcon?: boolean;
	onClick?: () => void;
	className?: string;
<<<<<<< HEAD
=======
	
>>>>>>> 1c8482753dce764f99b40e5f2dd8d5e73f9ebe75
}