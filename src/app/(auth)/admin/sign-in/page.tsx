import { AuthLoginForm } from '@/components/forms/auth-login-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function SignIn() {
	return (
		<div>
			<div className=' capitalize text-h5Bold md:text-h3Bold mb-5 grid place-items-center'>
				Admin Login
			</div>
			<AuthLoginForm />
			<div className='grid place-items-center'>
				<Button
					asChild
					variant='link'
				>
					<Link href='/agent/sign-in'>LOGIN AS AGENT</Link>
				</Button>
			</div>
		</div>
	);
}
