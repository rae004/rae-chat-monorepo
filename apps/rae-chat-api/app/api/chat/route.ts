import { OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getAiConfig } from './getAiConfig';

let openai: OpenAIApi;

try {
    const config = getAiConfig();
    openai = new OpenAIApi(config);
} catch (e) {
    console.error('Error caught getting Open AI config: ', e);
}

export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages } = await req.json();
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
