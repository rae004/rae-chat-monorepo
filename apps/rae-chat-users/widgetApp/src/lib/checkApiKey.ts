import {
    getBaseAuthUrl,
    getRaeChatUserDetails,
} from './constants';

const apiKeyCheck = async (setIsAuthed: any) => {
    const baseUrl = getBaseAuthUrl();
    const key = getRaeChatUserDetails();
    const results = await fetch(
        `${baseUrl}/api/auth/keys?key=${key.apiKey}&email=${key.apiUserEmail}`,
        {
            method: 'GET',
        },
    );

    if (results.status === 200) {
        setIsAuthed(true);
        return true;
    }

    return false;
};

export default apiKeyCheck;
