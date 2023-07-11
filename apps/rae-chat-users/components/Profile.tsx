import { prisma } from '../lib/prisma';

export default async function ProfileComponent({
    ...props
}: {
    email: string;
}) {
    const email = props.email;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            apiKeys: true,
        },
    });

    // todo find better way to exclude password.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user['password'];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <h1>User Profile:</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}
