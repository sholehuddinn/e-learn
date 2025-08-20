export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const cookie = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7) 
      : null;

    if (!cookie) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(`${process.env.LIK_TARGET}/dashboard/show_khs`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        Origin: process.env.LIK_TARGET,
        Referer: `${process.env.LIK_TARGET}/dashboard/khs`,
        "User-Agent": process.env.USER_AGENT,
        Cookie: cookie,
      },
      body: ""
    });

    if (!res.ok) {
      return Response.json(
        { message: "Failed to fetch KHS data" },
        { status: res.status }
      );
    }

    const contentType = res.headers.get("content-type") || "";
    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      try {
        data = JSON.parse(text.trim()); 
      } catch {
        data = text;
      }
    }

    return Response.json({
      message: "Data KHS Mahasiswa",
      data,
    });
  } catch (err) {
    console.error("Error fetch KHS:", err.message);
    return Response.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
