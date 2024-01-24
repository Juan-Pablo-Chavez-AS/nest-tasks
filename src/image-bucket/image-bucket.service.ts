import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class ImageBucketService {
  async uploadImage(image: MemoryStoredFile, name: string) {
    const client = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.CLOUDFARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFARE_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFARE_SECRET_ACCESS_KEY,
      },
    });
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFARE_IMAGE_BUCKET_NAME,
      Key: `${name}.png`,
    });

    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
    const response = await fetch(signedUrl, {
      method: 'PUT',
      body: image.buffer,
    });

    return response;
  }
}
