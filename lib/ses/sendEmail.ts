import { SendEmailCommand } from "@aws-sdk/client-ses"
import { sesClient } from "./ses"

export async function sendEmail(to: string, subject: string, body: string) {
  const params = {
    Source: process.env.SES_FROM_EMAIL as string,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: body,
        },
      },
    },
  }

  const command = new SendEmailCommand(params)

  try {
    const response = await sesClient.send(command)
    console.log("Email sent successfully:", response)
    return response
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}
