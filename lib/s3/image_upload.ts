import { PutObjectCommand } from "@aws-sdk/client-s3"
import imageCompression from "browser-image-compression"
import { s3Client } from "./s3"

interface UploadOptions {
  folder?: string
  optimize?: boolean
  maxsizeMB?: number
  heightOrWidth?: number
}

export async function uploadMultipleImagesToS3(
  files: File[],
  options?: UploadOptions
): Promise<string[]> {
  const uploadPromises = files.map(async (file) => {
    let fileToUpload = file
    if (options?.optimize) {
      fileToUpload = await optimizeImage(
        file,
        options.maxsizeMB || 2,
        options.heightOrWidth || 1920
      )
    }

    return uploadImageToS3(fileToUpload, options?.folder)
  })

  const results = await Promise.allSettled(uploadPromises)

  return results
    .filter(
      (res): res is PromiseFulfilledResult<string> => res.status === "fulfilled"
    )
    .map((res) => res.value)
}

export async function uploadImageToS3(
  file: File,
  folder?: string
): Promise<string> {
  const fileName = encodeURIComponent(`${file.name}-${Date.now()}`)
  const fileKey = folder ? `${folder}/${fileName}` : fileName
  const url = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${fileKey}`

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
    Key: fileKey,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
    CacheControl: "max-age=86400",
  }

  try {
    const res = await s3Client.send(new PutObjectCommand(params))
    if (res.$metadata.httpStatusCode !== 200) {
      throw new Error("Failed to upload image to S3")
    }

    return url
  } catch (error) {
    throw error
  }
}

async function optimizeImage(
  file: File,
  maxSizeMB: number,
  heightOrWidth: number
): Promise<File> {
  const optimizedImage = await imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight: heightOrWidth,
    useWebWorker: true,
  })

  return optimizedImage
}
