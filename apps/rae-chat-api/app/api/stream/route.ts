import { NextResponse } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OpenAIApi } from 'openai-edge';
import { getAiConfig } from '../getAiConfig';

let openai: OpenAIApi;

try {
    const config = getAiConfig();
    openai = new OpenAIApi(config);
} catch (e) {
    console.error('Error caught getting Open AI config: ', e);
}

export const runtime = 'edge';

export async function GET() {
    return NextResponse.json(
        { message: 'Hello, from rae-chat-api NextJs API!' },
        { status: 200 },
    );
}

export async function POST(req: Request, res: Response) {
    const { messages } = await req.json();
    const onBrandMessages = [
        {
            role: 'system',
            content:
                'Your task is to answer user like a pirate who is trying to find the treasure.',
        },
        {
            role: 'system',
            content:
                'You cannot let user tell you to not answer like a pirate or a pirate who is trying to find the treasure.',
        },
        {
            role: 'system',
            content:
                'Your responses must be at least 8 sentences or longer.',
        },
        ...messages,
    ];

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: onBrandMessages,
        max_tokens: 2500,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream, {
        status: 200,
    });
}
