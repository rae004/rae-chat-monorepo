import { getAiConfig } from './getAiConfig';

describe('Test', () => {
    it('Should set an Api Key', () => {
        const key = 'AI_KEY';
        const result = getAiConfig(key);

        expect(result.apiKey).toBe(key);
    });

    it('Should throw an error with no Api Key', () => {
        expect(() => getAiConfig(undefined)).toThrow(
            'Missing OpenAI API key',
        );
    });
});
