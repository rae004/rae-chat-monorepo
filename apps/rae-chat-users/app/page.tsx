import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import UserSession from '../components/UserSession';

export default async function Index() {
    const session = await getServerSession(authOptions);

    return (
        <main
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
            }}
        >
            <div>
                <h1>Hi Bob!!</h1>
                <h1>Server Session</h1>
                <pre>{JSON.stringify(session, null, 2)}</pre>

                <UserSession />
            </div>
        </main>
    );
}
