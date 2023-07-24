import {
    S3Client,
    CreateBucketCommand,
    HeadBucketCommand,
    PutObjectCommand,
    CreateBucketCommandOutput,
    PutObjectCommandOutput,
    HeadBucketCommandInput,
    CreateBucketCommandInput,
    PutBucketPolicyCommand,
    PutBucketPolicyCommandInput,
    PutBucketPolicyCommandOutput,
    PutBucketVersioningCommand,
    PutBucketVersioningCommandInput,
    PutBucketVersioningCommandOutput,
    ListObjectVersionsCommandInput,
    ListObjectVersionsCommandOutput,
    ListObjectVersionsCommand,
    ListObjectsCommandInput,
    ListObjectsCommandOutput,
    ListObjectsCommand,
    DeleteObjectCommandInput,
    DeleteObjectCommandOutput,
    DeleteObjectCommand,
    DeleteBucketCommandInput,
    DeleteBucketCommandOutput,
    DeleteBucketCommand,
    DeleteObjectsCommand,
    DeleteObjectsCommandInput,
    DeleteObjectsCommandOutput,
    PutBucketTaggingCommandInput,
    PutBucketTaggingCommandOutput,
    PutBucketTaggingCommand,
    Tag as S3Tags,
    DeletePublicAccessBlockCommandOutput,
    DeletePublicAccessBlockCommandInput,
    DeletePublicAccessBlockCommand,
} from '@aws-sdk/client-s3';
import {
    CloudFrontClient,
    CreateDistributionCommand,
    CreateDistributionCommandInput,
    CreateDistributionCommandOutput,
    CreateInvalidationCommandOutput,
    CreateInvalidationCommandInput,
    CreateInvalidationCommand,
    DeleteDistributionCommandInput,
    DeleteDistributionCommandOutput,
    DeleteDistributionCommand,
    UpdateDistributionCommandInput,
    UpdateDistributionCommandOutput,
    UpdateDistributionCommand,
    GetDistributionCommandInput,
    GetDistributionCommandOutput,
    GetDistributionCommand,
    TagResourceCommandInput,
    TagResourceCommandOutput,
    TagResourceCommand,
    Tag as CFTag,
} from '@aws-sdk/client-cloudfront';
import {
    BatchGetBuildsCommand,
    BatchGetBuildsCommandInput,
    BatchGetBuildsCommandOutput,
    BatchGetProjectsCommand,
    BatchGetProjectsCommandInput,
    BatchGetProjectsCommandOutput,
    CodeBuildClient,
    CreateProjectCommand,
    CreateProjectCommandInput,
    CreateProjectCommandOutput,
    DeleteProjectCommand,
    DeleteProjectCommandOutput,
    DeleteProjectInput,
    StartBuildCommand,
    StartBuildCommandInput,
    StartBuildCommandOutput,
    Tag as CbTags,
} from '@aws-sdk/client-codebuild';
import { PutObjectCommandInput } from '@aws-sdk/client-s3/dist-types/commands/PutObjectCommand';

type AwsTags = S3Tags[] | CbTags[] | CFTag[];

const timer = (
    ms: number,
): Promise<ReturnType<typeof setTimeout>> =>
    new Promise((res) => setTimeout(res, ms));

export class AwsService {
    readonly awsRegion: string;
    readonly awsTags: AwsTags;
    readonly s3Tags: AwsTags;
    readonly cbTags: AwsTags;
    readonly cfTags: AwsTags;
    readonly appEnvironment: string;
    private readonly awsConfig: {
        awsRegion: string;
        awsKey: string;
        awsSecret: string;
    };
    constructor() {
        this.awsRegion = process.env.AWS_REGION || 'us-east-1';
        this.appEnvironment =
            process.env.APP_ENVIRONMENT || 'local';

        this.awsTags = [
            { Key: 'Project', Value: 'Apollidon Forms' },
            {
                Key: 'Environment',
                Value: `${this.appEnvironment}`,
            },
        ];
        this.s3Tags = this.awsTags;
        this.cbTags = [
            { key: 'Project', value: 'Apollidon Forms' },
            {
                key: 'Environment',
                value: `${this.appEnvironment}`,
            },
        ];
        this.cfTags = this.awsTags;

        this.awsConfig = {
            awsRegion: this.awsRegion,
            awsKey:
                process.env.AWS_ACCESS_KEY_ID || 'no-key-id',
            awsSecret:
                process.env.AWS_SECRET_ACCESS_KEY ||
                'no-access-key',
        };
    }

    // CloudFront methods
    async deleteCloudFrontDistribution(
        options: DeleteDistributionCommandInput,
    ): Promise<DeleteDistributionCommandOutput> {
        const client = new CloudFrontClient(this.awsConfig);
        const command = new DeleteDistributionCommand(options);
        return await client.send(command);
    }

    async updateCloudFrontDistribution(
        options: UpdateDistributionCommandInput,
    ): Promise<UpdateDistributionCommandOutput> {
        const client = new CloudFrontClient(this.awsConfig);
        const command = new UpdateDistributionCommand(options);
        return await client.send(command);
    }

    async tagCloudFrontResource(
        options: TagResourceCommandInput,
    ): Promise<TagResourceCommandOutput> {
        const client = new CloudFrontClient(this.awsConfig);
        const command = new TagResourceCommand(options);
        return await client.send(command);
    }

    async getCloudFrontDistribution(
        options: GetDistributionCommandInput,
    ): Promise<GetDistributionCommandOutput> {
        const client = new CloudFrontClient(this.awsConfig);
        const command = new GetDistributionCommand(options);
        return await client.send(command);
    }

    async waitForDistributionToDisableAndDelete(
        distributionId: string,
        distEtag: string,
    ) {
        let disableComplete = false;
        let disableTimeout = false;
        let sleepTimerId: any = null;

        // set a default max timeout for check
        const buildStatusCheckTimeoutId = setTimeout(() => {
            if (sleepTimerId) {
                clearTimeout(sleepTimerId);
                disableComplete = true;
                disableTimeout = true;
            }
        }, 480000);

        do {
            // get current distribution state
            const distribution =
                await this.getCloudFrontDistribution({
                    Id: distributionId,
                });

            const isDistroDisabled =
                distribution?.Distribution?.Status ===
                    'Deployed' &&
                !distribution?.Distribution?.DistributionConfig
                    ?.Enabled;

            // wait to not spam aws api
            sleepTimerId = await timer(3000);

            // if distro is disabled clear timers and set disableComplete true
            if (isDistroDisabled) {
                clearTimeout(buildStatusCheckTimeoutId);
                clearTimeout(sleepTimerId);
                disableComplete = true;
            }
        } while (!disableComplete);

        if (disableComplete && !disableTimeout) {
            await this.deleteCloudFrontDistribution({
                Id: distributionId,
                IfMatch: distEtag,
            });
        }
    }

    async createCloudFrontInvalidation(
        options: CreateInvalidationCommandInput,
    ): Promise<CreateInvalidationCommandOutput> {
        const client = new CloudFrontClient(this.awsConfig);
        const command = new CreateInvalidationCommand(options);
        return await client.send(command);
    }

    async createCloudFrontDistribution(
        options: CreateDistributionCommandInput,
    ): Promise<CreateDistributionCommandOutput> {
        const client = new CloudFrontClient(this.awsConfig);
        const command = new CreateDistributionCommand(options);
        return await client.send(command);
    }

    // s3 Methods
    async doesBucketExist(
        options: HeadBucketCommandInput,
    ): Promise<any> {
        const client = new S3Client(this.awsConfig);
        // catch needed to determine if bucket exists
        // HeadBucketCommand will throw 404 when bucket doesn't exist
        try {
            const command = new HeadBucketCommand(options);
            return await client.send(command);
        } catch (e: any) {
            if (e.$metadata.httpStatusCode === 404) {
                return e;
            }
        }
    }

    async createFormBundleBucket(
        options: CreateBucketCommandInput,
    ): Promise<CreateBucketCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new CreateBucketCommand(options);
        return await client.send(command);
    }

    async putBucketVersioning(
        options: PutBucketVersioningCommandInput,
    ): Promise<PutBucketVersioningCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new PutBucketVersioningCommand(options);
        return await client.send(command);
    }

    async putBucketTags(
        options: PutBucketTaggingCommandInput,
    ): Promise<PutBucketTaggingCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new PutBucketTaggingCommand(options);
        return await client.send(command);
    }

    async deleteS3Bucket(
        options: DeleteBucketCommandInput,
    ): Promise<DeleteBucketCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new DeleteBucketCommand(options);
        return await client.send(command);
    }

    async deleteObjectInS3Bucket(
        options: DeleteObjectCommandInput,
    ): Promise<DeleteObjectCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new DeleteObjectCommand(options);
        return await client.send(command);
    }

    async deleteObjectsInS3Bucket(
        options: DeleteObjectsCommandInput,
    ): Promise<DeleteObjectsCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new DeleteObjectsCommand(options);
        return await client.send(command);
    }

    async deletePublicAccessBlock(
        options: DeletePublicAccessBlockCommandInput,
    ): Promise<DeletePublicAccessBlockCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new DeletePublicAccessBlockCommand(
            options,
        );
        return await client.send(command);
    }

    async listObjectsInBucket(
        options: ListObjectsCommandInput,
    ): Promise<ListObjectsCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new ListObjectsCommand(options);
        return await client.send(command);
    }

    async listObjectVersions(
        options: ListObjectVersionsCommandInput,
    ): Promise<ListObjectVersionsCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new ListObjectVersionsCommand(options);
        return await client.send(command);
    }

    async putBucketPolicy(
        options: PutBucketPolicyCommandInput,
    ): Promise<PutBucketPolicyCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new PutBucketPolicyCommand(options);
        return await client.send(command);
    }

    async putFormBundleInBucket(
        options: PutObjectCommandInput,
    ): Promise<PutObjectCommandOutput> {
        const client = new S3Client(this.awsConfig);
        const command = new PutObjectCommand(options);
        return await client.send(command);
    }

    // CodeBuild Methods
    async waitForCodeBuildToFinish(
        codeBuildBuildId: string,
    ): Promise<{
        buildComplete: boolean;
        buildTimeout: boolean;
    }> {
        let buildComplete = false;
        let buildTimeout = false;
        let sleepTimerId: any = null;

        // set a default max timeout for check
        const buildStatusCheckTimeoutId = setTimeout(() => {
            clearTimeout(sleepTimerId);
            buildTimeout = true;
            buildComplete = true;
        }, 240000);

        do {
            // see if Code Build buildComplete is true
            const isBuildComplete =
                await this.isCodeBuildComplete(
                    codeBuildBuildId,
                );

            // wait to not spam aws api
            sleepTimerId = await timer(3000);

            // if build complete clear timers and
            if (isBuildComplete) {
                clearTimeout(buildStatusCheckTimeoutId);
                clearTimeout(sleepTimerId);
                buildComplete = true;
            }
        } while (!buildComplete);

        return { buildComplete, buildTimeout };
    }

    async isCodeBuildComplete(
        batchId: string,
    ): Promise<boolean> {
        const buildBatch = await this.getBuildBatches({
            ids: [batchId],
        });

        return (
            !!buildBatch?.builds?.length &&
            (buildBatch?.builds[0]?.buildComplete as boolean)
        );
    }

    async getBuildBatches(
        options: BatchGetBuildsCommandInput,
    ): Promise<BatchGetBuildsCommandOutput> {
        const client = new CodeBuildClient(this.awsConfig);
        const command = new BatchGetBuildsCommand(options);
        return await client.send(command);
    }

    async getCodeBuildProjects(
        options: BatchGetProjectsCommandInput,
    ): Promise<BatchGetProjectsCommandOutput> {
        const client = new CodeBuildClient(this.awsConfig);
        const command = new BatchGetProjectsCommand(options);
        return await client.send(command);
    }

    async createCodeBuildProject(
        options: CreateProjectCommandInput,
    ): Promise<CreateProjectCommandOutput> {
        const client = new CodeBuildClient(this.awsConfig);
        const command = new CreateProjectCommand(options);
        return await client.send(command);
    }

    async startCodeBuildProject(
        options: StartBuildCommandInput,
    ): Promise<StartBuildCommandOutput> {
        const client = new CodeBuildClient(this.awsConfig);
        const command = new StartBuildCommand(options);
        return await client.send(command);
    }

    async deleteCodeBuildProject(
        options: DeleteProjectInput,
    ): Promise<DeleteProjectCommandOutput> {
        const client = new CodeBuildClient(this.awsConfig);
        const command = new DeleteProjectCommand(options);
        return await client.send(command);
    }
}
