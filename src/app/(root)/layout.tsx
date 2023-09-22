import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'TransPay - Seamless levy payment.',
	description: 'Powered By ISCE',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className='h-full overflow-hidden'>{children}</div>;
}
