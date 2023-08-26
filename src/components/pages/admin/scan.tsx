'use client';
import React, { useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Card } from '@/components/ui/card';

export default function QRScan() {
	const [result, setResult] = useState<string | null>(null);

	useEffect(() => {
		const videoElement = document.getElementById(
			'video'
		) as HTMLVideoElement;
		const resultCallback = (result: string) => {
			setResult(result);
			scanner.pause();
		};
		const scanner = new QrScanner(videoElement, resultCallback);
		scanner.start();
		return () => {
			scanner.destroy();
		};
	}, []);

	return (
		<Card className='h-48 w-48 overflow-hidden'>
			<video
				className='h-full w-full'
				id='video'
			/>
			{result && (
				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
					<div className='bg-white p-4 rounded-lg shadow-lg'>
						<p className='text-lg font-medium mb-2'>
							QR Code Scanned
						</p>
						<p className='text-gray-500 mb-4'>{result}</p>
						<button
							onClick={() => {
								setResult(null);
								const videoElement =
									document.getElementById(
										'video'
									) as HTMLVideoElement;
								const scanner = new QrScanner(
									videoElement,
									() => {}
								);
								scanner.start();
							}}
							className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300'
						>
							Scan Again
						</button>
					</div>
				</div>
			)}
		</Card>
	);
}
