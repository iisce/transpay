import { ThemeProvider } from '@/components/ui/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import Provider from '@/lib/session-provider';
import { Analytics } from '@vercel/analytics/react';

const lato = Lato({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'TransPay - Seamless levy payment.',
	description: 'Powered By ISCE',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<Provider>
				<body className={`${lato.className}`}>
					<ThemeProvider
						attribute='class'
						defaultTheme='light'
						enableSystem
					>
						<div className=''>
							<NextTopLoader
								color='#7F7433'
								showSpinner={false}
							/>
							{children}
							<Toaster />
						</div>
					</ThemeProvider>
					<Analytics />
				</body>
			</Provider>
		</html>
	);
}
