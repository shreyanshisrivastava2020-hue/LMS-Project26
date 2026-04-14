import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function videoHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === "POST") {
    try {
      if (!request.body || !request.body.data) {
        return response.status(400).json({ error: "No file data provided" });
      }

      const file = request.body.data;
    } catch (error: any) {}
  }
}

export default cloudinary;
