import { prisma } from './prisma';
import crypto from 'crypto';

const generateApiKey = async () => {
    const key = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt'],
    );
    return await crypto.subtle.exportKey('jwk', key);
};

const createApiKeys = async () => {
    const apiKey = await generateApiKey();
    return apiKey.k;
};

export { createApiKeys };
