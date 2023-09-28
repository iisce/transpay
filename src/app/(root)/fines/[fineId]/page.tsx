import FineForm from '@/components/forms/fine-form';
import { FINE_CARDS } from '@/lib/consts';
import React from 'react';

export default function AddNewFines({
	params,
}: {
	params: { fineId: number };
}) {
	const fine = FINE_CARDS.find(
		(singleFine) => singleFine.id == params.fineId
	);
	if (fine) {
		return (
			<div className='w-full p-3 xs:p-5'>
				<div className=' py-4'>
					<h1 className=' text-h4Bold '>Edit Fines</h1>
				</div>
				<FineForm fine={fine} />
			</div>
		);
	} else {
		return <div className='w-full p-3 xs:p-5'>Cannot Find Fine</div>;
	}
}
