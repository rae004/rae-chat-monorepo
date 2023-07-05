import { NextResponse } from 'next/server';
export async function GET(req: Request) {
    return NextResponse.json(
        { message: 'Hello, from rae-chat-api NextJs API!' },
        { status: 200 },
    );
}
