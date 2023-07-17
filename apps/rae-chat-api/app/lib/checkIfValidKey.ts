const checkIfValidKey = async (
    key: string,
    email: string,
): Promise<boolean> => {
    const baseUrl =
        process.env.RAE_CHAT_USERS_API_URL ||
        'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/auth/keys?key=${key}&email=${email}`;

    try {
        const checkKeyValidityWithServer = await fetch(apiUrl, {
            method: 'GET',
        });

        if (checkKeyValidityWithServer.ok) {
            const { keyValid } =
                await checkKeyValidityWithServer.json();

            return keyValid;
        }
    } catch (error) {
        console.log('our error', error);
    }

    return false;
};

export default checkIfValidKey;
