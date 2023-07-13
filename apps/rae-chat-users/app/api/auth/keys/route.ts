import { createApiKeys } from '../../../../lib/apiKeys';
import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key') || 'no_key_found';
    const userEmail =
        searchParams.get('email') || 'no_email_found';
    const user = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { userApiKeys: true },
    });
    const userKey = user?.userApiKeys.find(
        ({ key: userKey }) => userKey === key,
    );
    const keyValid = !!userKey;

    return NextResponse.json({ keyValid });
}

export async function POST(req: Request) {
    const { email } = await req.json();
    const apiKey = await createApiKeys();

    if (apiKey) {
        await prisma.userApiKey.create({
            data: {
                key: apiKey,
                keyType: 'API_KEY',
                user: {
                    connect: { email },
                },
            },
        });

        return NextResponse.json({ apiKey: apiKey });
    }

    return NextResponse.json({
        error: 'Could not create api key',
    });
}
