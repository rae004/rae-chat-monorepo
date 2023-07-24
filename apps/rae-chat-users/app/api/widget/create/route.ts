import { NextResponse } from 'next/server';
import checkIfValidKey from '../../../../lib/checkIfValidKey';

export const runtime = 'edge';

export async function GET() {
    console.log('our route hit!!');
    return NextResponse.json(
        { message: 'Unauthorized.' },
        { status: 401 },
    );
}

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('apiKey') || 'no-key-found';
    const userEmail =
        searchParams.get('apiUserEmail') ||
        'no-user-email-found';
    const validKey = await checkIfValidKey(key, userEmail);
    console.log('our valid key! ', validKey);

    if (!validKey) {
        return NextResponse.json(
            { message: 'Unauthorized.' },
            { status: 401 },
        );
    }

    const body = await req.json();
    console.log('our body! ', body);

    return NextResponse.json(
        {
            message: 'Hello from create!!!',
        },
        { status: 200 },
    );
}
