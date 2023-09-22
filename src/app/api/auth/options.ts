import { API, URLS } from '@/lib/consts';
import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const config = {
	headers: {
		'api-secret': process.env.API_SECRET,
	},
};

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const res = await axios.post(
						API + URLS.auth.signin,
						{
							email: credentials?.email,
							password: credentials?.password,
						},
						config
					);
					if (res.status >= 200 && res.status < 300) {
						let user = res?.data?.data;
						console.log(user);
						return user;
					} else {
						console.log(res.statusText);
						return null;
					}
				} catch (error) {
					if (axios.isAxiosError(error)) {
						throw new Error(
							error.response?.data?.message ||
								'An error occurred during api connection.'
						);
					} else {
						throw new Error(
							'An error occurred during api connection.'
						);
					}
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
			// session.user.role = token.role as string;
			return session;
		},
		jwt: ({ token, user }) => {
			if (user) token.access_token = user.access_token;
			// if (user) token.role = user.role;
			return token;
		},
	},
};
