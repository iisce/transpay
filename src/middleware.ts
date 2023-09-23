import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const config = {
	matcher: [
		'/activities/:path*',
		'/admins/:path*',
		'/agents/:path*',
		'/dashboard/:path*',
		'/fines/:path*',
		'/manage/:path*',
		'/revenue/:path*',
		'/vehicles/:path*',
	],
};
export default withAuth(
	function middleware(request) {
		const response = NextResponse.next();
		response.cookies.set(
			'accessToken',
			request.nextauth.token?.access_token as string
		);
		response.cookies.set('role', request.nextauth.token?.role as string);
	},
	{
		callbacks: { authorized: ({ token }) => !!token },
	}
);
