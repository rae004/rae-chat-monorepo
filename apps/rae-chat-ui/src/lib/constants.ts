export const getBaseApiUrl = (
    baseHost = import.meta.env.VITE_NX_API_URL,
    basePort = import.meta.env.VITE_NX_API_PORT,
) => {
    return basePort ? `${baseHost}:${basePort}` : baseHost;
};
