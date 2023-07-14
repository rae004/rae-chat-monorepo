// import NextAuth from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
//
// const clientId = process.env.GITHUB_ID || '';
// const clientSecret = process.env.GITHUB_SECRET || '';
// export const authOptions = {
//     // Configure one or more authentication providers
//     providers: [
//         GithubProvider({
//             clientId,
//             clientSecret,
//         }),
//         // ...add more providers here
//     ],
// };
// export default NextAuth(authOptions);
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from './prisma';
import EmailProvider from 'next-auth/providers/email';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
    },
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                if (
                    !credentials?.email ||
                    !credentials.password
                ) {
                    return null;
                }

                const user = (await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })) as any;

                if (
                    !user ||
                    !(await compare(
                        credentials.password,
                        user.password,
                    ))
                ) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    randomKey: 'Hey cool',
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
};
