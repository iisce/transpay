import SearchVehicle from '@/components/pages/vehicle/search-vehicle';

export default function SearchPage({
	params,
}: {
	params: { plate_number: string };
}) {
	return (
		<div className='w-full'>
			{/* <NoLoginSearch plate_number={params.plate_number} /> */}
			<SearchVehicle id={params.plate_number} />
		</div>
	);
}
