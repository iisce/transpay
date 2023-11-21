import React from 'react';

export default function CardCheckInPage({
	params,
}: {
	params: { id: string };
}) {
	return <div>{params.id}</div>;
}
