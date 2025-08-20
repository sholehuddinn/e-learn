import urlSearchParam from "@/lib/urlSearchParams";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const authHeader = req.headers.get("authorization");
    const cookie = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7) 
      : null;

    const bodyPayload = new URLSearchParams(urlSearchParam);

    const res = await fetch(
      `${process.env.URL_TARGET}/tugas/table/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: process.env.URL_TARGET,
          Referer: `${process.env.URL_TARGET}/mhslearning/showmateri/${id}`,
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
        { message: "Failed to fetch tugas data" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json({ message: "Success fetch tugas data", ...data });
  } catch (err) {
    console.error("Materi API error:", err);
    return Response.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
