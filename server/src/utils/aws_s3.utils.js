import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

import fs from "fs"
import dotenv from "dotenv";

dotenv.config()

const S3BucketName = process.env.AWS_S3_BUCKET_NAME

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});


const uploadFile = async (file) => {
    const fileStream = fs.createReadStream(file.path)

    const fileKey = `${file.filename}-${crypto.randomUUID()}`
    const uploadStream = {
        Bucket: S3BucketName,
        Body: fileStream,
        Key: fileKey,
        ContentType: file.mimetype,
    }

    try {
        await s3.send(new PutObjectCommand(uploadStream))
        const imageUrl = await generateUrl(fileKey)

        return {
            imageKey: fileKey,
            imageUrl
        }

    } finally {
        fileStream.destroy();
    }

}

const generateUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: S3BucketName,
        Key: key,
    });

    return await getSignedUrl(s3, command, {
        expiresIn: 3600, // URL valid for 1 hour
    });
}


export { s3, uploadFile, generateUrl }
