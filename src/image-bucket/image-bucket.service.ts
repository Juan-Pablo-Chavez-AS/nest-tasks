import { Injectable } from '@nestjs/common';
import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class ImageBucketService {
  static readonly accountId = 'dfeb185a6751a7eeb59e6a61be6bc96c';
  static readonly accessKeyId = '4019d989be220432bd0168ca43e14a5e';
  static readonly secretAccessKey =
    '61c831572db724707e286ce531a95aa45b2551e807d56aad4f49c7974701f138';
  static readonly bucketName = 'task-poc';

  uploadImage(image: File, name: string) {
    const client = new S3Client({
      region: 'auto',
      endpoint: `https://${ImageBucketService.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: ImageBucketService.accessKeyId,
        secretAccessKey: ImageBucketService.secretAccessKey,
      },
    });

    const command = new PutObjectCommand({
      Bucket: ImageBucketService.bucketName,
      Key: `${name}.png`,
    });
    client.send(command);
  }
}
