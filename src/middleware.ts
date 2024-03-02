import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

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
		'/drivers/:path*',
		'/property/:path*',
		'/green-engine/:path*',
		// '/((?!api|_next/static|_next/image|favicon.ico|maintenance).*)',
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

// export function middleware(request: NextRequest) {
// 	return NextResponse.redirect(new URL('/maintenance', request.url));
// }
