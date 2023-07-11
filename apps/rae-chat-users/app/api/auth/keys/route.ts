import { createApiKeys } from '../../../../lib/apiKeys';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: Request) {
    return new Response('Hello, from API KeyS!');
}

export async function POST(req: Request) {
    const { email } = await req.json();
    const keyResults = await createApiKeys();

    if (keyResults) {
        await prisma.userApiKey.create({
            data: {
                key: keyResults,
                keyType: 'API_KEY',
                user: {
                    connect: { email },
                },
            },
        });
    }

    return new Response(
        JSON.stringify({ apiKey: keyResults }),
        { headers: { 'Content-Type': 'application/json' } },
    );
}
