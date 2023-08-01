export const getBaseApiUrl = (
    baseHost = import.meta.env.VITE_NX_API_URL,
    basePort = import.meta.env.VITE_NX_API_PORT,
) => {
    return basePort ? `${baseHost}:${basePort}` : baseHost;
};

export const getBaseAuthUrl = (
    baseHost = import.meta.env.VITE_CHAT_AUTH_URL,
    basePort = import.meta.env.VITE_CHAT_AUTH_PORT,
) => {
    return basePort ? `${baseHost}:${basePort}` : baseHost;
};

export const getRaeChatUserDetails = (
    apiKey = import.meta.env.VITE_USER_API_KEY,
    apiUserEmail = import.meta.env.VITE_USER_API_EMAIL,
): { apiKey: string; apiUserEmail: string } => {
    return { apiKey, apiUserEmail };
};
