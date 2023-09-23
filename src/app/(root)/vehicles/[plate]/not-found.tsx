import Link from 'next/link';

export default function NotFound() {
	return (
		<div>
			<h2>Vehicle Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href='/search'>Return to search</Link>
		</div>
	);
}
