import { searchIcon } from "@/lib/icons";
import React from 'react';

export default function Searchbar({
	placeholder,
	variant,
}: {
	placeholder: string;
	variant: string;
}) {
	const variants =
		variant === 'primary'
			? 'bg-primary-50 text-primary-400'
			: variant === 'secondary'
			? 'bg-transparent border border-black'
			: 'bg-primary-900 text-primary-400';
	return (
		<div
			className={`hidden sm:flex relative text-body w-full items-center h-14 rounded-[40px] ${variants}`}
		>
			<div className='absolute h-6 w-6 ml-3 text-black/60'>
				{searchIcon}
			</div>
			<input
				type='text'
				placeholder={placeholder}
				className={`bg-transparent focus:outline-0 pl-10 py-4 h-14 w-full rounded-2xl absolute`}
			/>
		</div>
	);
}