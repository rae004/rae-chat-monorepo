const baseHost = import.meta.env.VITE_NX_API_URL;
const basePort = import.meta.env.VITE_NX_API_PORT;
export const baseApiUrl = basePort
    ? `${baseHost}:${basePort}`
    : baseHost;
