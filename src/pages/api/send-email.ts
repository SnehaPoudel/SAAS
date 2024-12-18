import { NextApiRequest, NextApiResponse } from "next";
import { sendMail } from "@/lib/mail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { to, subject, text, html } = req.body;

    // Validate input
    // if (!to || !subject || (!text && !html)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Missing required fields" });
    // }

    try {
      // Send email using the sendMail utility
      await sendMail(to, subject, text, html);

      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
