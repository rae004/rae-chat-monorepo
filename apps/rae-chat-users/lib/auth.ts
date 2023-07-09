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

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
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
                return {
                    id: '1',
                    name: 'Admin',
                    email: 'admin@admin.com',
                };
            },
        }),
    ],
};
