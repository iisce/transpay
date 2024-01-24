import SearchVehicle from '@/components/pages/vehicle/search-vehicle';
import { getVehicleSummary } from '@/lib/controllers/vehicle-controller';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateMetadata({
	params,
}: {
	params: { bcid: string };
}) {
	const vehicle = await getVehicleSummary(params.bcid);
	if (!vehicle) return notFound();
	const pendingPayments = vehicle.VehicleTransactions.filter(
		(transaction) => transaction.payment_status === 'pending'
	);

	const isOwing = pendingPayments.length > 0;
	const totalPendingAmount = pendingPayments.reduce(
		(acc, order) => acc + order.amount,
		0
	);
	return {
		title: `${
			vehicle?.owners_name
		}} - ${vehicle?.category.toLocaleUpperCase()}`,
		description: `Vehicle is ${!isOwing && 'Cleared'}${
			isOwing && 'Owing ' + totalPendingAmount
		}`,
	};
}

export default function StatusPage({ params }: { params: { bcid: string } }) {
	return (
		<div className='w-full'>
			<SearchVehicle id={params.bcid} />
		</div>
	);
}
