import { API, URLS } from '@/lib/consts';
import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const config = {
	headers: {
		'api-secret': process.env.API_SECRET,
	},
};
const headers = {
	'api-secret': process.env.API_SECRET || '',
	'Content-Type': 'application/json',
};

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'Password', type: 'password' },
				role: { label: 'role', type: 'text' },
			},
			async authorize(credentials, req) {
				const apiRoute =
					credentials?.role === 'admin'
						? URLS.auth.signin.admin
						: URLS.auth.signin.agent;
				try {
					const res = await fetch(API + apiRoute, {
						method: 'POST',
						body: JSON.stringify(credentials),
						headers,
					});
					const result = await res.json();
					if (result.success === false) {
						throw new Error(
							result?.message || 'Something went wrong'
						);
					} else {
						let user = result?.data;
						console.log(user);
						return user;
					}
				} catch (error: any) {
					console.log(error);
					throw new Error(error.message);
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
		// maxAge: 60 * 60 * 24 * 7, // 7 days
		maxAge: 60 * 30,
	},
	pages: {
		signIn: '/sign-in',
		error: '/sign-in',
	},
	jwt: {
		// maxAge: 60 * 60 * 24 * 30,  // 30 days
		maxAge: 60 * 30,
	},
	callbacks: {
		session: ({ session, token }) => {
			session.user.access_token = token.access_token as string;
			// session.user.email = token.email as string;
			session.user.role = token.role as string;
			return session;
		},
		jwt: ({ token, user }) => {
			if (user) token.access_token = user.access_token;
			// if (user) token.email = user.email;
			if (user) token.role = user.role;
			return token;
		},
	},
};
