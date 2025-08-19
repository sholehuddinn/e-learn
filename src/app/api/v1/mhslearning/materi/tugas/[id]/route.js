import urlSearchParam from "@/app/lib/urlSearchParams";

export async function POST(req, { params }) {
  try {
    const { cookie } = await req.json();
    const { id } = params;

    // bungkus jadi x-www-form-urlencoded
    const bodyPayload = new URLSearchParams(urlSearchParam);

    const res = await fetch(
      `https://e-learning.unitomo.ac.id/tugas/table/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: "https://e-learning.unitomo.ac.id",
          Referer: `https://e-learning.unitomo.ac.id/mhslearning/showmateri/${id}`,
          "User-Agent": "Hayoo Cari Siapa",
          Cookie: cookie,
        },
        body: bodyPayload.toString(),
      }
    );

    if (!res.ok) {
      return Response.json(
        { message: "Failed to fetch tugas data" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json({ message: "Success fetch tugas data", data });
  } catch (err) {
    console.error("Materi API error:", err);
    return Response.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
