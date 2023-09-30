type Prettify<T> = {
	[k in keyof T]: T[K];
} & {};
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
interface DriverT {
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
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	showSearch?: boolean;
	showColumns?: boolean;
	searchWith?: string;
	searchWithPlaceholder?: string;
	showPagination?: boolean;
	showSelected?: boolean;
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
type IRole = 'superadmin' | 'admin' | 'agent';
interface IDashboardCard {
	title: string;
	amount: number;
	type: 'positive' | 'negative' | 'neutral';
	percent: number;
}
interface IActivities {
	id: number;
	name: string;
	time: string;
	date: string;
}
interface IPage {
	name: string;
	href: string;
	icon?: React.ReactNode;
}
interface IDashboard {
	data: {
		pages: IPage[];
		summary: {
			revenue: {
				months: any[];
				names: any[];
				changes: any[];
			};
		};
	};
}
interface IDriver {
	id: 1;
	driver_id: string;
	vehicle_id: string;
	firstname: string;
	lastname: string;
	phone: string;
	email: string;
	password: string;
	address: string;
	lga: string;
	city: string;
	state: string;
	country: string;
	postcode?: string;
	gender?: string;
	identification_type: string;
	identification_number: string;
	blacklisted: boolean;
	is_active: boolean;
	user_role: string;
	user_id: string;
	deleted: boolean;
	createdAt: string;
	updatedAt: string;
	Vehicle: Omit<
		IVehicle,
		'VehicleTransactions' | 'VehicleFines' | 'VehicleWaivers' | 'Drivers'
	>;
}

interface IVehicle {
	id: number;
	vehicle_id: string;
	color: string;
	category: string;
	plate_number: string;
	image?: string;
	user_role: string;
	user_id: string;
	blacklisted: boolean;
	current_driver?: IDriver;
	status: string;
	owners_phone_number: string;
	owners_name: string;
	vin: string;
	vehicle_type: string;
	barcode_string: string;
	tracker_id: string;
	deleted: boolean;
	createdAt: string;
	updatedAt: string;
	Drivers: IDriver[];
	VehicleTransactions: [];
	VehicleFines: [];
	VehicleWaivers: [];
}
type PrettyVehicle = Prettify<IVehicle>;
type PrettyVehicles = Prettify<IVehicles>;
interface IVehicles {
	data: {
		vehicles: IVehicle[];
	};
}

interface IAdmin {
	id: number;
	admin_id: string;
	name: string;
	email: string;
	password: string;
	phone: string;
	role: string;
	blacklisted: boolean;
	createdAt: string;
	updatedAt: string;
}

interface IResAdmin {
	admin: IAdmin;
}
interface IAdmins {
	data: {
		admins: IAdmin[];
	};
}
interface IResAgent {
	agent: IAgent;
}
interface IAgents {
	data: {
		agents: IAgent[];
	};
}
interface IResVehicle {
	vehicle: IVehicle;
}
interface IVehicles {
	data: {
		vehicles: IVehicle[];
	};
}
interface IResDrivers {
	drivers: IDriver[];
}
interface IDrivers {
	data: {
		drivers: IDriver[];
	};
}
interface IUser {
	admin_id: string;
	blacklisted: boolean;
	createdAt: string;
	email: string;
	exp?: number;
	iat?: number;
	id: number;
	image: string;
	name: string;
	password: string;
	phone: string;
	role: string;
	updatedAt: string;
	user_type?: string;
}
interface IAgent {
	id: number;
	agent_id: string;
	name: string;
	phone: string;
	password: string;
	email: string;
	identification_type: string;
	identification_number: string;
	role: string;
	location: string;
	city: string;
	country: string;
	postcode: string;
	blacklisted: boolean;
	created_by: string;
	is_active: boolean;
	is_admin: boolean;
	createdAt: string;
	updatedAt: string;
}
interface IAdminMe {
	data: {
		admin: IUser;
	};
}
interface IAgentMe {
	data: {
		agent: IUser;
	};
}

interface ICategories {
	id: string;
	name: string;
}

interface ICreateVehicleForm {
	image: string;
	category: string;
	color: string;
	status: string;
	vehicle_id?: string;
	plate_number: string;
	owners_phone_number: string;
	owners_name: string;
	vehicle_type: string;
	vin: string;
	barcode_string?: string;
	tracker_id?: string;
}
interface ICreateDriverForm {
	name: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	lga: string;
	identification_type: string;
	identification_number: string;
	is_active: boolean;
	vehicle_id?: string;
}
interface IAddLicenseForm {
	license_number: string;
	license_name: string;
	license_expiry: string;
	driver_id?: string;
}
interface ICreateAdminForm {
	name: string;
	email: string;
	password: string;
	phone: string;
	role: string;
	admin_id?: string;
}
interface ICreateAgentForm {
	name: string;
	password: string;
	phone: string;
	email: string;
	identification_type: string;
	identification_number: string;
	role: string;
	location: string;
	city: string;
	country: string;
	postcode: string;
	agent_id?: string;
}
