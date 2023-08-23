import React from 'react';

export default function Pill({
	status,
	text,
}: {
	status: string;
	text: string;
}) {
	const dot = status === 'active' ? 'bg-[#086400]' : 'bg-destructive';
	const bg = status === 'active' ? 'bg-[#086400]/30' : 'bg-destructive/30';
	const color = status === 'active' ? 'text-[#086400]' : 'text-destructive';

	return (
		<div
			className={`w-min h-[25px] flex items-center gap-2 rounded-full px-3 ${bg} ${color}`}
		>
			<span className={`h-3 w-3 rounded-full ${dot}`}></span>
			<span className=''>{text}</span>
		</div>
	);
}
