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
import { deleteIcon, editIcon, paymentIcon } from '@/lib/icons';
import Pill from '../pill';
import Link from 'next/link';
import { Badge } from '../badge';
import Cbadge from '../category-badge';

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

export const agentsColumns: ColumnDef<AgentT>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'area',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Area'
			/>
		),
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<Pill
				status={row.getValue('status')}
				text={row.getValue('status')}
			/>
		),
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
					<DropdownMenuContent align='end'>
						<DropdownMenuItem asChild>
							<Link href={`/dashboard/agents/${row.id}`}>
								<span className='h-4 w-4 mr-3'>
									{editIcon}
								</span>
								View Agent
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='text-destructive'>
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
export const driversColumns: ColumnDef<AgentT>[] = [
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
							<Link href={`/dashboard/drivers/${row.id}`}>
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
								href={`/dashboard/drivers/payment/${row.id}`}
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

export const viewDriversColumns: ColumnDef<AgentT>[] = [
	{
		accessorKey: 'date',
		header: 'Date',
	},
	{
		accessorKey: 'amount_NGN',
		header: 'Amount (NGN)',
		cell: ({ row }) => (
			<span className='uppercase'>{row.getValue('amount_NGN')}</span>
		),
	},
	{
		accessorKey: 'payment_type',
		header: 'Payment',
		cell: ({ row }) => (
			<Pill
				status={row.getValue('status')}
				text={row.getValue('status')}
			/>
		),
	},
	{
		accessorKey: 'handled_by',
		header: 'Handled By',
		cell: ({ row }) => <Cbadge variant={row.getValue('handled_by')} />,
	},
	
];
