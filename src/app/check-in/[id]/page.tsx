import { checkInOut } from '@/app/api/check-in/test';
import { notFound, redirect } from 'next/navigation';

export default async function page({ params }: { params: { id: string } }) {
	const v = await checkInOut(params.id);
	if (!v) return notFound();
	return redirect(`/check-in/${v.plate}/checked`);
}
