import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class FilesService {
  private s3 = new S3Client({
    region: process.env.MINIO_REGION || 'us-east-1',
    endpoint: process.env.MINIO_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.MINIO_ROOT_USER || 'minioadmin',
      secretAccessKey: process.env.MINIO_ROOT_PASSWORD || 'minioadmin'
    }
  });

  constructor(private prisma: PrismaService) {}

  async presign(fileName: string, contentType: string) {
    const key = `docs/${Date.now()}-${fileName}`;
    const command = new PutObjectCommand({ Bucket: process.env.MINIO_BUCKET, Key: key, ContentType: contentType });
    const url = await getSignedUrl(this.s3, command, { expiresIn: 900 });
    return { url, fileKey: key };
  }

  attachDocument(applicationId: string, typeKey: string, fileKey: string) {
    return this.prisma.applicationDocument.create({ data: { applicationId, typeKey, fileKey, status: 'UPLOADED' } });
  }
}
