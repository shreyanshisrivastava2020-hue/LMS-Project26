import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function getUserFromToken(request: Request) {
  try {
    const token = request.headers
      .get("cookie")
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return null;

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const user = await User.findById(decoded.id);
    return user;
  } catch (error) {
    console.log("JWT Error:", error);
    return null;
  }
}