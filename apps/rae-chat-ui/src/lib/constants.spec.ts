import { describe } from 'vitest';
import { getBaseApiUrl } from './constants';

describe('Test Constants', () => {
    const testBaseHost = 'http://localhost';
    const testBasePort = '3333';

    it('should return base url with port number if port number is defined.', () => {
        const baseUrl = getBaseApiUrl(
            testBaseHost,
            testBasePort,
        );
        expect(baseUrl).toBe(`${testBaseHost}:${testBasePort}`);
    });

    it('should return base url without port number if port number is not defined.', () => {
        const baseUrl = getBaseApiUrl(testBaseHost);
        expect(baseUrl).toBe(testBaseHost);
    });
});
