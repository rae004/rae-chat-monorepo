const checkIfValidKey = async (
    key: string,
    email: string,
): Promise<boolean> => {
    const baseUrl =
        process.env.RAE_CHAT_USERS_API ||
        'http://localhost:4203';
    const apiUrl = `${baseUrl}/api/auth/keys?key=${key}&email=${email}`;

    const checkKeyValidityWithServer = await fetch(apiUrl, {
        method: 'GET',
    });
    const { keyValid } =
        await checkKeyValidityWithServer.json();

    return keyValid;
};

export default checkIfValidKey;
