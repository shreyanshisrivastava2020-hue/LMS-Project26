// app/api/execute/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = "https://ce.judge0.com";

export async function POST(req: Request) {
  try {
    const { source_code, language_id } = await req.json();

    // STEP 1: Submit code
    const submit = await axios.post(
      `${BASE_URL}/submissions?base64_encoded=false&wait=false`,
      {
        source_code,
        language_id,
      },
    );

    const token = submit.data.token;

    // STEP 2: Poll result
    const getResult = async (token: string) => {
      for (let i = 0; i < 10; i++) {
        const res = await axios.get(
          `${BASE_URL}/submissions/${token}?base64_encoded=false`,
        );

        if (res.data.status.id <= 2) {
          // 1 = in queue, 2 = processing
          await new Promise((r) => setTimeout(r, 1000));
          continue;
        }

        return res.data;
      }

      throw new Error("Execution timeout");
    };

    const result = await getResult(token);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.response?.data || error.message,
      },
      { status: 500 },
    );
  }
}
