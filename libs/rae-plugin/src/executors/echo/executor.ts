import type { ExecutorContext } from '@nx/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

export interface EchoExecutorOptions {
    textToEcho: string;
}

export default async function echoExecutor(
    options: EchoExecutorOptions,
    context: ExecutorContext,
): Promise<{ success: boolean }> {
    console.info(`Executing "echo"...`);
    console.info(
        `Options: ${JSON.stringify(options, null, 2)}`,
    );
    console.log(
        `our context name: ${context.projectName}\n at target name: ${context.targetName} `,
    );

    const { stdout, stderr } = await promisify(exec)(
        `echo ${options.textToEcho}`,
    );
    console.log(stdout);
    console.error(stderr);

    const success = !stderr;
    return { success };
}
