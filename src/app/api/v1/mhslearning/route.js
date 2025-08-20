import urlSearchParam from "@/lib/urlSearchParams";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const cookie = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7) 
      : null;

    // bungkus jadi x-www-form-urlencoded
    const bodyPayload = new URLSearchParams(urlSearchParam);

    const res = await fetch(
      `${process.env.URL_TARGET}/mhslearning/table`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: process.env.URL_TARGET,
          Referer: `${process.env.URL_TARGET}/mhslearning`,
          "User-Agent": process.env.USER_AGENT,
          Cookie: cookie,
        },
        body: bodyPayload.toString(),
      }
    );

    if (!cookie) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!res.ok) {
      return Response.json(
        { message: "Failed to fetch dashboard data" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json({ message: "Welcome to the mahasiswa learning", ...data });
  } catch (err) {
    console.error("Dashboard API error:", err);
    return Response.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
