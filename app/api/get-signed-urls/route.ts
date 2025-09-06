import { NextRequest, NextResponse } from "next/server"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { s3Client } from "@/lib/s3/s3"

interface SignedUrlResponse {
  signedUrl: string
  cfUrl: string
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { files, folder } = await req.json()

  if (!files || !Array.isArray(files)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  try {
    const urls = await Promise.all(
      files.map(
        async ({
          filename,
          fileType,
        }: {
          filename: string
          fileType: string
        }) => {
          const { signedUrl, cfUrl } = await uploadImageMetadataToS3(
            filename,
            fileType,
            folder
          )
          return { signedUrl, cfUrl }
        }
      )
    )

    return NextResponse.json({ urls }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

async function uploadImageMetadataToS3(
  filename: string,
  fileType: string,
  folder?: string
): Promise<SignedUrlResponse> {
  const fileName = encodeURIComponent(`${filename}-${Date.now()}`)
  const fileKey = folder ? `${folder}/${fileName}` : fileName
  const cfUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${fileKey}`

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
    Key: fileKey,
    ContentType: fileType,
    CacheControl: "max-age=86400",
  }
  const command = new PutObjectCommand(params)

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 })
    if (!signedUrl) {
      throw new Error("Could not generate signed URL")
    }

    return { signedUrl, cfUrl }
  } catch (error) {
    throw error
  }
}
