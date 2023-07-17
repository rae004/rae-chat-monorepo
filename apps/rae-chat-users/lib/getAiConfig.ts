import { Configuration } from 'openai-edge';

export const getAiConfig = (
    apiKey: string | undefined = process.env.OPENAI_API_KEY,
) => {
    if (!apiKey) {
        throw new Error('Missing OpenAI API key');
    }

    return new Configuration({
        apiKey,
    });
};
