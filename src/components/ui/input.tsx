'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { eyesCloseIcon, eyesOpenIcon } from '@/lib/icons';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [showPassword, setShowPassword] =
			React.useState<boolean>(false);
		return (
			<div className='relative flex w-full items-center'>
				<input
					type={showPassword ? 'text' : type}
					className={cn(
						'flex h-12 w-full rounded-xl bg-secondary px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
					ref={ref}
					{...props}
				/>
				{type === 'password' && (
					<div
						onClick={() => setShowPassword(!showPassword)}
						className='absolute right-0 mr-4 h-6 w-6'
					>
						{showPassword ? eyesOpenIcon : eyesCloseIcon}
					</div>
				)}
			</div>
		);
	}
);
Input.displayName = 'Input';

export { Input };
