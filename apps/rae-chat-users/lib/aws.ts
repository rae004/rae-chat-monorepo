import {
    S3Client,
    CreateBucketCommand,
    HeadBucketCommand,
    DeleteBucketCommand,
} from '@aws-sdk/client-s3';

const accessKeyId =
    process.env.AWS_ACCESS_KEY_ID || 'no-key-found';
const secretAccessKey =
    process.env.AWS_SECRET_ACCESS_KEY || 'no-secret-found';

const getS3Client = () => {
    return new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
};

const bucketName = 'rae-dev-test-bucket';

export const createBucket = async () => {
    const client = getS3Client();
    const input = {
        Bucket: bucketName,
    };
    const command = new CreateBucketCommand(input);
    return await client.send(command);
};

export const doesBucketExist = async () => {
    const client = getS3Client();
    const input = {
        Bucket: bucketName,
    };
    const command = new HeadBucketCommand(input);
    return await client.send(command);
};

export const deleteBucket = async (bucketName: string) => {
    const client = getS3Client();
    const input = {
        Bucket: bucketName,
    };
    const command = new DeleteBucketCommand(input);
    return await client.send(command);
};
