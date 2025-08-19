import urlSearchParam from "@/app/lib/urlSearchParams";

export async function POST(req) {
  try {
    const { cookie } = await req.json();

    const bodyPayload = new URLSearchParams(urlSearchParam);

    const res = await fetch(
      "https://e-learning.unitomo.ac.id/dashboard/table",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",   // tambahin ini
          Origin: "https://e-learning.unitomo.ac.id",
          Referer: "https://e-learning.unitomo.ac.id/dashboard",
          "User-Agent":
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:141.0) Gecko/20100101 Firefox/141.0", // tiru dari browser
          Cookie: cookie, // pastikan lengkap
        },
        body: bodyPayload.toString(),
      }
    );

    if (!res.ok) {
      return Response.json(
        { message: "Failed to fetch dashboard data" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json({ message: "Welcome to the dashboard", data });
  } catch (err) {
    console.error("Dashboard API error:", err);
    return Response.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
