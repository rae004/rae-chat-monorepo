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
            userApiKeys: true,
        },
    });

    const displayUser = {
        ...user,
        password: '<HIDDEN>',
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <h1>User Profile:</h1>
            <pre>{JSON.stringify(displayUser, null, 2)}</pre>
        </div>
    );
}
