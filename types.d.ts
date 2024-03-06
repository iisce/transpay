type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
interface IVehiclePayment {
	status: boolean;
	last_message: string;
	deficit: number;
	createdAt: string;
	updatedAt: string;
	id: string;
	amount: number;
	payment_status: 'pending' | 'processing' | 'success' | 'failed';
	vehicle_transaction_id: string;
	vehicle_id: string;
	transaction_date: string;
	description: string;
	payment_gateway_name: string;
	transaction_type: string;
	currency: 'NGN';
	invoice_number: string;
	invoice_prefix: string;
	invoice_details: string;
	payment_type: string;
	user_role: string;
	user_id: string;
	transfer_id: string;
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
interface IWaiver {
	start_date: string;
	end_date: string;
	reason: string;
	status: string;
	generated_by: string;
	approved: boolean;
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
	showRowsPerPage?: boolean;
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
	desc?: string;
}
interface IActivity {
	id: number;
	activity_id: string;
	user_role: string;
	user_id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

interface IActivityCard {
	id: number;
	activity_id: string;
	user_role?: string;
	user_id?: string;
	name: string;
	description: string;
	date?: string;
	time?: string;
}

interface IPage {
	name: string;
	href: string;
	icon?: React.ReactNode;
}
interface IDashboard {
	data: {
		admins: {
			blacklisted: IAdmin[];
		};
		chart: {
			transactions: {
				all: IVehicleTransaction[];
				dailyFees: IVehicleTransaction[];
				fines: any[];
			};
			total: {
				dailyFees: number;
				fines: number;
				revenue: number;
			};
		};
		activities: Pick<
			IActivity,
			'activity_id' | 'id' | 'name' | 'description'
		>[];
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

interface IVehicle extends IWallet {
	id: number;
	vehicle_id: string;
	color: string;
	category: string;
	plate_number: string;
	image: string;
	user_role: string;
	user_id: string;
	blacklisted: boolean;
	current_driver: string;
	status: string;
	deleted: boolean;
	vehicle_type: string;
	vin: string;
	barcode_string: string;
	owners_phone_number: string;
	owners_name: string;
	tracker_id: string;
	createdAt: string;
	updatedAt: string;
	Drivers: IDriver[];
	VehicleTransactions: {
		id: number;
		vehicle_transaction_id: string;
		vehicle_id: string;
		transaction_date: string;
		description: string;
		payment_gateway_name: string;
		transaction_type: string;
		amount: number;
		currency: string;
		invoice_number: string;
		invoice_prefix: string;
		invoice_details: string;
		payment_type: string;
		user_role: string;
		user_id: string;
		payment_status: string;
		status: boolean;
		transfer_id: string;
		last_message: string;
		deficit: number;
		createdAt: string;
		updatedAt: string;
	}[];
	VehicleFines: [];
	VehicleWaivers: [];
	VehicleWallet: {
		vehicle_id: string;
		nuban: string;
		account_name: string;
		bank_name: string;
	};
	VehicleBalance: {
		id: number;
		vehicle_balance_id: string;
		vehicle_id: string;
		wallet_balance: number;
		deficit_balance: number;
		net_total: number;
		next_transaction_date: string;
		createdAt: string;
		updatedAt: string;
	};
	VehicleTracker: null;
	wallet_balance: {
		currency: string;
		available_balance: number;
		ledger_balance: number;
	};
}

interface IWallet {
	vehicle_id: string;
	nuban: number;
	account_name: string;
	bank_name: string;
}

interface IVehicleTransaction {
	id?: number;
	vehicle_transaction_id?: string;
	vehicle_id: string;
	transaction_date: string;
	description?: string;
	payment_gateway_name: string;
	transaction_type: string;
	amount: number;
	currency: 'NGN';
	invoice_number?: string;
	invoice_prefix?: string;
	invoice_details?: string;
	payment_type?: 'transfer';
	user_role?: string;
	user_id?: string;
	payment_status: 'pending' | 'processing' | 'successful';
	status?: boolean;
	transfer_id?: string;
	last_message: string | null;
	deficit?: number;
	createdAt?: string;
	updatedAt?: string;
}

type PrettyVehicle = Prettify<IVehicle>;
type PrettyVehicles = Prettify<IVehicles>;
interface IVehicles {
	data: {
		vehicles: IVehicle[];
		page: number;
		limit: number;
		total: number;
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

interface IVehicleSummary extends Omit<IVehicle, ''> {
	current_driver?: string;
}

interface IResVehicleSummary {
	data: {
		vehicle: IVehicleSummary;
	};
}

type PrettyVehicleSummary = Prettify<IResVehicleSummary>;
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
interface IResSettings {
	data: {
		settings: ISettings[];
	};
}
interface ISettings {
	id: number;
	setting_id: string;
	name: string;
	description: string;
	value: string;
	user_id: string;
	user_role: string;
	updated_by_id: string;
	updated_by_role: string;
	createdAt: string;
	updatedAt: string;
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

interface IRevenue {
	transactions: IVehicleTransaction[];
	total: {
		dailyFees: number;
		fines: number;
		revenue: number;
	};
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
	with_wallet: boolean;
	vehicle_type: string;
	vin: string;
	barcode_string?: string;
	tracker_id?: string;
}
interface ICreateSettingForm {
	setting_id: string;
	name: string;
	description: string;
	value: string;
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

interface IToken {
	token: string;
	secret: string;
}

// {
//     "success": true,
//     "message": "SuperAdmin Dashboard",
//     "data": {
//         "admins": {
//             "blacklisted": []
//         },
//         "transactions": [
//             {
//                 "vehicle_id": "a71dd8f6-f4ac-4d05-876c-1a211c5c33fc",
//                 "transaction_type": "DAILY_FEES",
//                 "transaction_date": "2023-10-05T01:11:10.000Z",
//                 "payment_gateway_name": "flutterwave",
//                 "amount": 100,
//                 "currency": "NGN",
//                 "payment_status": "successful",
//                 "last_message": null
//             },
//             {
//                 "vehicle_id": "a71dd8f6-f4ac-4d05-876c-1a211c5c33fc",
//                 "transaction_type": "TRACKER_FEES",
//                 "transaction_date": "2023-10-06T23:33:39.000Z",
//                 "payment_gateway_name": "flutterwave",
//                 "amount": 50,
//                 "currency": "NGN",
//                 "payment_status": "successful",
//                 "last_message": null
//             },
//             {
//                 "vehicle_id": "a71dd8f6-f4ac-4d05-876c-1a211c5c33fc",
//                 "transaction_type": "TRACKER_FEES",
//                 "transaction_date": "2023-10-14T10:07:00.000Z",
//                 "payment_gateway_name": "flutterwave",
//                 "amount": 50,
//                 "currency": "NGN",
//                 "payment_status": "successful",
//                 "last_message": null
//             },
//             {
//                 "vehicle_id": "a71dd8f6-f4ac-4d05-876c-1a211c5c33fc",
//                 "transaction_type": "TRACKER_FEES",
//                 "transaction_date": "2023-10-14T23:19:07.000Z",
//                 "payment_gateway_name": "flutterwave",
//                 "amount": 50,
//                 "currency": "NGN",
//                 "payment_status": "successful",
//                 "last_message": null
//             },
//             {
//                 "vehicle_id": "a71dd8f6-f4ac-4d05-876c-1a211c5c33fc",
//                 "transaction_type": "DAILY_FEES",
//                 "transaction_date": "2023-10-20T06:11:30.000Z",
//                 "payment_gateway_name": "flutterwave",
//                 "amount": 100,
//                 "currency": "NGN",
//                 "payment_status": "successful",
//                 "last_message": null
//             },
//             {
//                 "vehicle_id": "a71dd8f6-f4ac-4d05-876c-1a211c5c33fc",
//                 "transaction_type": "TRACKER_FEES",
//                 "transaction_date": "2023-10-20T06:11:30.000Z",
//                 "payment_gateway_name": "flutterwave",
//                 "amount": 50,
//                 "currency": "NGN",
//                 "payment_status": "successful",
//                 "last_message": null
//             },
//             {
//                 "vehicle_id": "a71dd8f6-f4ac-4d05-876c-1a211c5c33fc",
//                 "transaction_type": "DAILY_FEES",
//                 "transaction_date": "2023-10-30T01:52:10.000Z",
//                 "payment_gateway_name": "flutterwave",
//                 "amount": 100,
//                 "currency": "NGN",
//                 "payment_status": "successful",
//                 "last_message": null
//             },
//             {
//                 "vehicle_id": "a71dd8f6-f4ac-4d05-876c-1a211c5c33fc",
//                 "transaction_type": "TRACKER_FEES",
//                 "transaction_date": "2023-10-30T01:52:10.000Z",
//                 "payment_gateway_name": "flutterwave",
//                 "amount": 50,
//                 "currency": "NGN",
//                 "payment_status": "successful",
//                 "last_message": null
//             }
//         ],
//         "activities": [
//             {
//                 "id": 1,
//                 "activity_id": "f093bfff-6ba9-4869-97cb-8ada1a1fea9b",
//                 "name": "TTest",
//                 "description": "working here"
//             },
//             {
//                 "id": 2,
//                 "activity_id": "ceb7f6f6-48f5-471b-95f3-4688995f972c",
//                 "name": "update-admin",
//                 "description": "Johnny doe updated the database"
//             },
//             {
//                 "id": 3,
//                 "activity_id": "d653d62a-d36f-4359-80d1-2f668dca5682",
//                 "name": "create-admin",
//                 "description": "Mark Cuban doe created an admin"
//             },
//             {
//                 "id": 4,
//                 "activity_id": "5c0fa80e-3cb0-491d-9563-d02550da7aa9",
//                 "name": "create-driver",
//                 "description": "Mark Cuban doe created a driver"
//             },
//             {
//                 "id": 5,
//                 "activity_id": "4bb89356-bb02-4249-a2b1-4a9b48a7b102",
//                 "name": "create-vehicle",
//                 "description": "Mark Cuban doe vehicle created"
//             },
//             {
//                 "id": 6,
//                 "activity_id": "ed324c5e-907f-4d9c-ba0a-bce3803d7eab",
//                 "name": "banks",
//                 "description": "fetched description"
//             },
//             {
//                 "id": 7,
//                 "activity_id": "413a3c83-5f68-4aeb-b36f-f5c3864fe55a",
//                 "name": "banks",
//                 "description": "fetched description"
//             },
//             {
//                 "id": 8,
//                 "activity_id": "31f59799-510f-4569-b43b-b644e9113e72",
//                 "name": "banks",
//                 "description": "fetched description"
//             },
//             {
//                 "id": 9,
//                 "activity_id": "eb54c94c-749c-47ab-b977-b0e0344468e1",
//                 "name": "banks",
//                 "description": "fetched description"
//             },
//             {
//                 "id": 10,
//                 "activity_id": "8979cba6-a389-4923-b18d-e7f08d23e745",
//                 "name": "banks",
//                 "description": "fetched description"
//             }
//         ]
//     }
// }

// SAMPLE OF INTERSTATE
interface IInterStateVehicle {
	id: number;
	plate: string;
	ownername: string;
	owneraddress: string;
	ischeckedin: boolean;
	checkintime?: string;
	checkouttime?: string;
}

interface NFCCard {
	plate: string;
}

interface CheckInRecord {
	plate: string;
	checkintime: Date;
}

interface CheckOutRecord {
	plate: string;
	checkouttime: Date;
	fee: number;
}

interface Database {
	getVehicleById(plate: string): Vehicle | null;
	saveCheckInRecord(record: CheckInRecord): void;
	saveCheckOutRecord(record: CheckOutRecord): void;
}

interface IPropertyPaymentRecord {
	paymentDate: string;
	amountPaid: number;
}

interface IProperty {
	propertyId: string;
	ownerName: string;
	address: string;
	propertyType: string;
	assessmentValue: number;
	taxRate: number;
	taxAmount: number;
	paymentDueDate: string;
	isPaid: boolean;
	paymentRecords: IPropertyPaymentRecord[];
}


interface IDurationSummary {
  duration: string;
  totalDurationKekeRev: number;
  totalDurationSmallShuttleRev: number;
  totalDurationBigShuttleRev: number;
  totalDurationTrackerRev: number;
  lgaRevenueSummary: ILGARevenueSummary[];
}

interface ILGARevenueSummary {
  lga: string;
  totalRev: number;
  kekeRev: number;
  smallshuttleRev: number;
  bigshuttleRev: number;
  trackerRev: number;
}
type ITotalDashboard = 'DAILY_FEES' | 'TOTAL' | 'TRACKER_FEES';
