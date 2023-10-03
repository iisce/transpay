'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import { DataTableColumnHeader } from './data-column-table-header';
import {
	deleteIcon,
	editIcon,
	finesIcon,
	paymentIcon,
	printIcon,
} from '@/lib/icons';
import Pill from '../pill';
import Link from 'next/link';
import Cbadge from '../category-badge';
import { deleteAdminById } from '@/lib/controllers/admin-controller';
import DeleteAdminButton from '@/components/shared/delete-admin-button';

export const paymentColumns: ColumnDef<Payment>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'payment_type',
		header: 'Payment Type',
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Email'
			/>
		),
	},
	{
		accessorKey: 'amount',
		header: () => <div className='text-right'>Amount</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);

			return <div className='text-right font-medium'>{formatted}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'
						>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(
									payment.id
								)
							}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>
							View payment details
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
export const adminsColumns: ColumnDef<IAdmin>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Name'
			/>
		),
		cell: ({ row }) => (
			<Link
				href={`/admins/${row.original.admin_id}`}
				className=''
			>
				{row.original.name}
			</Link>
		),
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Email'
			/>
		),
		cell: ({ row }) => <div>{row.original.email}</div>,
	},
	{
		accessorKey: 'phone',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Phone'
			/>
		),
		cell: ({ row }) => <div>{row.original.phone}</div>,
	},
	{
		accessorKey: 'blacklisted',
		header: 'Status',
		cell: ({ row }) => {
			if (row.getValue('blacklisted') === true)
				return (
					<Pill
						status={'inactive'}
						text={'inactive'}
					/>
				);
			else
				return (
					<Pill
						status={'active'}
						text={'active'}
					/>
				);
		},
	},
	{
		id: 'actions',
		header: 'Action',
		cell: ({ row }) => {
			return (
				<div className='flex gap-2 justify-start items-center'>
					<Link
						href={`/admins/${row.original.admin_id}`}
						className='h-5 w-5 items-center shrink-0'
					>
						{editIcon}
					</Link>
					<DeleteAdminButton id={row.original.admin_id} />
				</div>
			);
		},
	},
];
export const agentsColumns: ColumnDef<IAgent>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Name'
			/>
		),
		cell: ({ row }) => (
			<Link
				href={`/agents/${row.original.agent_id}`}
				className=''
			>
				{row.original.name}
			</Link>
		),
	},
	{
		accessorKey: 'location',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Location'
			/>
		),
	},
	{
		accessorKey: 'phone',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Phone'
			/>
		),
		cell: ({ row }) => <div>{row.original.phone}</div>,
	},
	{
		accessorKey: 'is_active',
		header: 'Status',
		cell: ({ row }) => {
			if (row.getValue('is_active') === true)
				return (
					<Pill
						status={'active'}
						text={'active'}
					/>
				);
			else
				return (
					<Pill
						status={'inactive'}
						text={'inactive'}
					/>
				);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<MoreVertical className='h-4 w-4' />
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem asChild>
							<Link
								href={`/agents/${row.original.agent_id}`}
							>
								<span className='h-4 w-4 mr-3'>
									{editIcon}
								</span>
								View Agent
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className=' text-destructive-foreground'>
							<span className='h-4 w-4 mr-3'>
								{deleteIcon}
							</span>
							Delete Agent
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
export const vehiclesColumns: ColumnDef<IVehicle>[] = [
	{
		accessorKey: 'Drivers',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Driver'
			/>
		),
		cell: ({ row }) => (
			<Link
				href={`/vehicles/${row.original.vehicle_id}`}
				className=''
			>
				{row.original.owners_name}
			</Link>
		),
	},
	{
		accessorKey: 'plate_number',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Plate Number'
			/>
		),
		cell: ({ row }) => (
			<div className='uppercase'>{row.original.plate_number}</div>
		),
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Status'
			/>
		),
		cell: ({ row }) => (
			<div className='uppercase'>{row.original.status}</div>
		),
	},
	{
		accessorKey: 'category',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Category'
			/>
		),
		cell: ({ row }) => (
			<div className='uppercase'>{row.original.category}</div>
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const vehicle = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<MoreVertical className='h-4 w-4' />
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='border border-black'
						align='end'
					>
						<DropdownMenuItem
							className='border-b border-black rounded-none'
							asChild
						>
							<Link
								href={`/vehicles/${vehicle.vehicle_id}`}
							>
								<span className='h-4 w-4 mr-3'>
									{editIcon}
								</span>
								View Vehicle
							</Link>
						</DropdownMenuItem>
						{/* <DropdownMenuItem
							className='border-b border-black rounded-none'
							asChild
						>
							<Link
								href={`/vehicles/${vehicle.vehicle_id}/payments`}
							>
								<span className='h-4 w-4 mr-3'>
									{paymentIcon}
								</span>
								View Payment
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className='border-b border-black rounded-none'
							asChild
						>
							<Link
								href={`/vehicles/${vehicle.vehicle_id}/fines`}
							>
								<span className='h-4 w-4 mr-3'>
									{finesIcon}
								</span>
								View Fines
							</Link>
						</DropdownMenuItem> */}
						<DropdownMenuItem className='text-destructive'>
							Delete Vehicle
						</DropdownMenuItem>
						<DropdownMenuItem
							className=''
							onClick={() =>
								navigator.clipboard.writeText(
									vehicle.vehicle_id
								)
							}
						>
							Copy vehicle ID
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
export const agentPaymentColumns: ColumnDef<AgentPayment>[] = [
	{
		accessorKey: 'driver',
		header: 'Driver',
	},
	{
		accessorKey: 'amount',
		header: () => <div className='text-right'>Amount</div>,
		cell: ({ row }) => {
			const amount = row.getValue('amount');
			return (
				<div className='text-right font-medium'>{`₦${amount}`}</div>
			);
		},
	},
	{
		accessorKey: 'date',
		header: 'Date',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.original.status;
			const style =
				status === 'failed'
					? 'text-destructive-foreground'
					: status === 'successful'
					? 'text-awesome-foreground'
					: status === 'pending'
					? 'text-orange-300'
					: 'text-primary';
			return <div className={`uppercase ${style}`}>{status}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original;
			return (
				<Button
					className='gap-2'
					onClick={() =>
						navigator.clipboard.writeText(payment.driver)
					}
				>
					<div className='h-4 w-4'>{printIcon}</div>Print
				</Button>
			);
		},
	},
];
export const viewDriversColumns: ColumnDef<DriverPayment>[] = [
	{
		accessorKey: 'Date',
		header: 'Date',
	},
	{
		accessorKey: 'amount_NGN',
		header: () => <div className='text-right'>Amount</div>,
		cell: ({ row }) => {
			const amount = row.getValue('amount_NGN');
			return (
				<div className='text-right font-medium'>{`₦${amount}`}</div>
			);
		},
	},
	{
		accessorKey: 'payment_type',
		header: 'Payment Type',
		cell: ({ row }) => {
			const payment_type = row.original.payment_type;
			const style =
				payment_type === 'Cash'
					? 'text-destructive-foreground'
					: payment_type === 'Mobile Transfer'
					? 'text-awesome-foreground'
					: payment_type === 'Transfer'
					? 'text-orange-300'
					: 'text-primary';
			return (
				<div className={`uppercase ${style}`}>{payment_type}</div>
			);
		},
	},

	{
		accessorKey: 'handled_by',
		header: 'Handled By',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original;
			return (
				<Button
					className='gap-2'
					onClick={() =>
						navigator.clipboard.writeText(payment.driver)
					}
				>
					<div className='h-4 w-4'>{printIcon}</div>Print
				</Button>
			);
		},
	},
];
export const driversColumns: ColumnDef<IDriver>[] = [
	{
		accessorKey: 'firstname',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Name'
			/>
		),
		cell: ({ row }) => (
			<span className=''>{`${row.original.firstname} ${row.original.lastname}`}</span>
		),
	},
	{
		accessorKey: 'phone',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Phone'
			/>
		),
	},
	{
		accessorKey: 'lga',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='LGA'
			/>
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const driver = row.original;
			return (
				<div
					className=' cursor-pointer'
					onClick={() => {
						navigator.clipboard.writeText(driver.driver_id);
					}}
				>
					Copy ID
				</div>
			);
		},
	},
];

// WEBAGENT
export const webAgentDriversColumns: ColumnDef<AgentT>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'plate',
		header: 'Vehicle Plate Number',
		cell: ({ row }) => (
			<span className='uppercase'>{row.getValue('plate')}</span>
		),
	},
	{
		accessorKey: 'plate',
		header: 'Vehicle Plate Number',
		cell: ({ row }) => (
			<span className='uppercase'>{row.getValue('plate')}</span>
		),
	},
	{
		accessorKey: 'status',
		header: 'Today Status',
		cell: ({ row }) => (
			<Pill
				status={row.getValue('status')}
				text={row.getValue('status')}
			/>
		),
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell: ({ row }) => <Cbadge variant={row.getValue('category')} />,
	},

	{
		id: 'actions',
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'
						>
							<span className='sr-only'>Open menu</span>
							<MoreVertical className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='border border-black'
						align='end'
					>
						<DropdownMenuItem
							className='border-b border-black rounded-none'
							asChild
						>
							<Link href={`/web-agent/driver/${row.id}`}>
								<span className='h-4 w-4 mr-3'>
									{editIcon}
								</span>
								View Driver
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className='border-b border-black rounded-none'
							asChild
						>
							<Link
								href={`/web-agent/driver/payment/${row.id}`}
							>
								<span className='h-4 w-4 mr-3'>
									{paymentIcon}
								</span>
								Make Payment
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='text-destructive'>
							<span className='h-4 w-4 mr-3'>
								{deleteIcon}
							</span>
							Delete Driver
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
export const viewWebAgentDriversColumns: ColumnDef<DriverPayment>[] = [
	{
		accessorKey: 'Date',
		header: 'Date',
	},
	{
		accessorKey: 'amount_NGN',
		header: () => <div className='text-right'>Amount</div>,
		cell: ({ row }) => {
			const amount = row.getValue('amount_NGN');
			return (
				<div className='text-right font-medium'>{`₦${amount}`}</div>
			);
		},
	},
	{
		accessorKey: 'payment_type',
		header: 'Payment Type',
		cell: ({ row }) => {
			const payment_type = row.original.payment_type;
			const style =
				payment_type === 'Cash'
					? 'text-destructive-foreground'
					: payment_type === 'Mobile Transfer'
					? 'text-awesome-foreground'
					: payment_type === 'Transfer'
					? 'text-orange-300'
					: 'text-primary';
			return (
				<div className={`uppercase ${style}`}>{payment_type}</div>
			);
		},
	},

	{
		accessorKey: 'handled_by',
		header: 'Handled By',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original;
			return (
				<Button
					className='gap-2'
					onClick={() =>
						navigator.clipboard.writeText(payment.driver)
					}
				>
					<div className='h-4 w-4'>{printIcon}</div>Print
				</Button>
			);
		},
	},
];
//Waiver History
export const viewWaiverColumns: ColumnDef<DriverPayment>[] = [
	{
		accessorKey: 'timeline',
		header: 'Timeline',
	},
	{
		accessorKey: 'amount_NGN',
		header: () => <div className='text-center'>Reason</div>,
		cell: ({ row }) => {
			const status = row.getValue('status');
			return (
				<div className='text-center font-medium'>{`${status}`}</div>
			);
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.original.payment_type;

			return <div className={`uppercase`}>{status}</div>;
		},
	},

	{
		accessorKey: 'generated_by',
		header: 'Generated By',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'
						>
							<span className='sr-only'>Open menu</span>
							<MoreVertical className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='border border-black'
						align='end'
					>
						<DropdownMenuItem
							className='border-b border-black rounded-none'
							asChild
						>
							<Link
								href={`/vehicles/${row.id}/waiver/add-new`}
							>
								<span className='h-4 w-4 mr-3'>
									{editIcon}
								</span>
								Extend Waived
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='text-destructive'>
							<span className='h-4 w-4 mr-3'>
								{deleteIcon}
							</span>
							End Waiver
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
