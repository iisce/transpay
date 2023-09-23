import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='grid place-items-center w-full'>
			<div className='flex flex-col items-center justify-center text-center'>
				<h2>Vehicle Not Found</h2>
				<p>Could not find requested resource</p>
				<Link href='/search'>Return to search</Link>
			</div>
		</div>
	);
}
