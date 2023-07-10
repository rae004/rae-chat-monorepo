import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import ProfileComponent from '../../components/Profile';

export default async function Profile() {
    const session = await getServerSession(authOptions);

    if (session && session.user && session.user.email) {
        return (
            <main
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                }}
            >
                <ProfileComponent email={session.user.email} />
            </main>
        );
    }

    return <div>No session</div>;
}
