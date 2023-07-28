import { NextResponse } from 'next/server';
import checkIfValidKey from '../../../lib/checkIfValidKey';
import {
    createBucket,
    deleteBucket,
    doesBucketExist,
} from '../../../lib/aws/s3Sdk';

export const runtime = 'edge';

const logCaughtErrorFromAws = (e: any) => {
    const { statusCode, reason } = e.$response;
    if (statusCode >= 200 && statusCode <= 299) {
        console.log('our bucket success: ', reason, statusCode);
    }

    if (statusCode >= 300 && statusCode <= 399) {
        console.log(
            'our bucket redirect: ',
            reason,
            statusCode,
        );
    }

    if (statusCode >= 400 && statusCode <= 499) {
        console.log('our bucket issue: ', reason, statusCode);
    }

    if (statusCode >= 500) {
        console.error(
            'our caught bucket error! ',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            e.$response,
        );
    }
};

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

    try {
        const result = await createBucket();
        // const result = await doesBucketExist();
        console.log('create bucket result: ', result);
    } catch (e) {
        logCaughtErrorFromAws(e);
    }

    try {
        const result = await doesBucketExist();
        console.log('head bucket result: ', result);
    } catch (e) {
        logCaughtErrorFromAws(e);
    }

    return NextResponse.json(
        {
            message: 'Hello from create!!!',
        },
        { status: 200 },
    );
}

export async function DELETE(req: Request) {
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

    const bucketName =
        searchParams.get('bucketName') ||
        'no-bucket-name-found';
    console.log('our bucket name:  ', bucketName);

    try {
        const result = await deleteBucket(bucketName);
        console.log('our results: ', result);
    } catch (e) {
        logCaughtErrorFromAws(e);
    }

    return NextResponse.json(
        {
            message: 'Hello from Delete!!!',
        },
        { status: 200 },
    );
}
