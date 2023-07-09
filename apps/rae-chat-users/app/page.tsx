import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
} from '../components/Buttons';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import UserSession from '../components/UserSession';
import * as crypto from 'crypto';

export default async function Index() {
    const session = await getServerSession(authOptions);
    const key = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt'],
    );
    const jwk = await crypto.subtle.exportKey('jwk', key);
    console.log('Our key is: ', jwk.k);

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
