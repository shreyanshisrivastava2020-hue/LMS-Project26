import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user: any = session.user;

  const courses = user.courses || [];

  const completed = courses.filter((c: any) => c.progress === 100).length;

  const totalHours = courses.reduce(
    (sum: number, c: any) => sum + (c.hours || 0),
    0
  );

  const avgProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce(
            (sum: number, c: any) => sum + (c.progress || 0),
            0
          ) / courses.length
        )
      : 0;

  return Response.json({
    name: user.name,
    email: user.email,
    phone: user.phone,
    courses: courses.map((c: any) => c.title),
    completed,
    hours: totalHours + "h",
    progress: avgProgress + "%",
  });
}