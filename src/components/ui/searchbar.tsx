'use client';
import { searchIcon } from '@/lib/icons';
import React, { useState } from 'react';
import { Button } from './button';
import { useRouter } from 'next/navigation';

export default function Searchbar({
	placeholder,
	variant,
}: {
	placeholder: string;
	variant: string;
}) {
	const [searchValue, setSearchValue] = useState('');
	const router = useRouter();

	const variants =
		variant === 'primary'
			? 'bg-primary-50 text-primary-400'
			: variant === 'secondary'
			? 'bg-transparent border border-black'
			: 'bg-primary-900 text-primary-400';

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(`/vehicles/${searchValue.toLowerCase()}`);
	};

	return (
		<form
			className={`flex relative text-body w-full items-center h-14 rounded-[40px] overflow-hidden ${variants}`}
			onSubmit={handleSubmit}
		>
			<Button
				type='submit'
				variant='default'
				className='absolute h-full aspect-square z-10 rounded-none'
			>
				{searchIcon}
			</Button>
			<input
				name='search'
				type='text'
				placeholder={placeholder}
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)} // Update searchValue when the input changes
				className={`bg-transparent focus:outline-0 pl-16 py-4 h-14 w-full rounded-2xl absolute`}
			/>
		</form>
	);
}
