import Carousel from '@/components/layout/authCarousel';
import CarouselSlides from '@/components/layout/carouselSlides';
import Image from 'next/image';
import React from 'react';

const slides = [
	<>
		<CarouselSlides
			desc='Accountability in a civilized society is the stepping stone to
        development and progressive Environment'
			images='/avater.png'
			author='ISCE Digital Concepts'
			title='Governor Anambra state'
		/>
	</>,
	<>
		<CarouselSlides
			desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore'
			images='/avater.png'
			author='ISCE Digital Concepts'
			title='Governor Anambra state'
		/>
	</>,
	<>
		<CarouselSlides
			desc='knkdnfjdnfdjf jdnfdjfndjdjfndfjdngkfbfg ffgjfgfbgfj gfgbfgjjgbjbgjgbdjbdg
      dgdbdb ngfigtmitgutng gutgnt tngtjg'
			images='/avater.png'
			author='ISCE Digital Concepts'
			title='Governor Anambra state'
		/>
	</>,
];

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-5 p-3 lg:p-5 min-h-screen bg-background'>
			<div className='hidden lg:flex justify-center items-center w-full p-3 md:p-5 lg:p-10 bg-gradient-to-b from-primary-900 to-primary-700 text-white rounded-2xl'>
				<div className='flex flex-col justify-between h-full max-w-[550px]'>
					<div className='flex flex-col gap-12'>
						<div className='text-h5'>TRANSPAY</div>
						<div className='flex flex-col gap-4'>
							<div className='font-bold text-h2 2xl:text-h1'>
								Ensure Drivers are Checked with Maximum
								Road Safety!!!
							</div>
							<h2 className='text-h5 2xl:text-h4 max-w-[485px]'>
								Where drivers payment are checked and
								road safety is ensured and money can be
								tracked
							</h2>
						</div>
					</div>
					<div>
						<div className='w-full flex flex-col mt-8 gap-7 bg-primary-900 p-7 rounded-2xl'>
							<Carousel slides={slides} />
						</div>
					</div>
				</div>
			</div>
			<div className='flex h-full rounded-2xl justify-center items-start lg:items-center'>
				<div className='flex flex-col w-full gap-5 md:gap-10 items-center max-w-[450px] lg:ml-10 xl:ml-20'>
					<div className='h-20 md:h-48 w-20 md:w-48 flex items-center justify-center'>
						<Image
							src='/authpageLogo.png'
							width={250}
							height={250}
							alt='logo'
							className='dark:invert h-full w-full object-contain'
						/>
					</div>
					<div className='w-full max-w-md'>{children}</div>
				</div>
			</div>
		</div>
	);
}
