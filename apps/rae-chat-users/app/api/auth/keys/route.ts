import { createApiKeys } from '../../../../lib/apiKeys';

export async function GET(request: Request) {
    return new Response('Hello, from API KeyS!');
}

export async function POST(request: Request) {
    const keyResults = await createApiKeys();
    return new Response(
        JSON.stringify({ apiKey: keyResults }),
        { headers: { 'Content-Type': 'application/json' } },
    );
}
