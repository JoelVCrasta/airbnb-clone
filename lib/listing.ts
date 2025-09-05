import axios from "axios"

interface SignedUrlResponse {
  signedUrl: string
  cfUrl: string
}

export const getSignedUrls = async (
  files: File[],
  folder?: string
): Promise<SignedUrlResponse[]> => {
  try {
    const payload = {
      files: files.map((file) => ({
        filename: file.name,
        fileType: file.type,
      })),
      folder,
    }

    const response = await axios.post("/api/get-signed-urls", payload)
    if (response.status !== 200) {
      throw new Error("Failed to get signed URLs")
    }

    return response.data.urls as SignedUrlResponse[]
  } catch (error) {
    throw error
  }
}

export const uploadFilesToS3 = async (
  files: File[],
  urls: SignedUrlResponse[]
) => {
  try {
    // Upload each file to its corresponding signed URL
    await Promise.all(
      files.map((file, index) =>
        axios.put(urls[index].signedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        })
      )
    )

    // Return CloudFront URLs
    return urls.map((url) => url.cfUrl)
  } catch (error) {
    console.error("Error uploading files to S3:", error)
    throw error
  }
}
