export { default } from 'next-auth/middleware';

export const config = {
    // matcher: ["/profile"],
    matcher: ['/((?!api/register|api/auth|api/chat|login).*)'],
};
