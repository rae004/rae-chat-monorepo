import { EchoExecutorSchema } from './schema';
import executor from './executor';
import { ExecutorContext } from 'nx/src/config/misc-interfaces';

const options: EchoExecutorSchema = {
    textToEcho: 'hello world',
};

describe('Echo Executor', () => {
    it('can run', async () => {
        const output = await executor(
            options,
            {} as ExecutorContext,
        );
        expect(output.success).toBe(true);
    });
});
