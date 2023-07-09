import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
} from '../components/Buttons';
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
                <LoginButton />
                <RegisterButton />
                <LogoutButton />
                <ProfileButton />
                <h1>Server Session</h1>
                <pre>{JSON.stringify(session)}</pre>

                <UserSession />
            </div>
        </main>
    );
}
