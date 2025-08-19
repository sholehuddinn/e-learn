// src/app/api/v1/mhslearning/table_materi/[kdmtk]/[kelas]/[kdhari]/[kdjur]/route.js

export async function POST(req, { params }) {
  try {
    const { cookie } = await req.json();
    const { kdmtk, kelas, kdhari, kdjur } = params;

    // bungkus jadi x-www-form-urlencoded
    const bodyPayload = new URLSearchParams({
      kdmtk,
      kelas,
      kdhari,
      kdjur,
    });

    const res = await fetch(
      `https://e-learning.unitomo.ac.id/mhslearning/table_materi/${kdmtk}/${kelas}/${kdhari}/${kdjur}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: "https://e-learning.unitomo.ac.id",
          Referer: `https://e-learning.unitomo.ac.id/mhslearning/materi/${kdmtk}/${kelas}/${kdhari}/${kdjur}`,
          "User-Agent": "Hayoo Cari Siapa",
          Cookie: cookie,
        },
        body: bodyPayload.toString(),
      }
    );

    if (!res.ok) {
      return Response.json(
        { message: "Failed to fetch materi data" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json({ message: `Materi fetched successfully`, data });
  } catch (err) {
    console.error("Materi API error:", err);
    return Response.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
