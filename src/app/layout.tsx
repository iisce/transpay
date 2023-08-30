import { ThemeProvider } from '@/components/ui/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';

const lato = Lato({
	weight: '300',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'TransPay - Seamless levy payment.',
	description: 'Powered By ISCE',
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
			<body className={`${lato.className} h-screen overflow-hidden`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
				>
					<div className='h-full overflow-hidden'>
						<NextTopLoader
							color='#7F7433'
							showSpinner={false}
						/>
						{children}
						<Toaster />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
