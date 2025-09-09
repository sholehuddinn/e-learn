export async function POST(req) {
  try {
    const formData = await req.formData();

    const authHeader = req.headers.get("authorization");
    const cookie = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7) 
      : null;

    const res = await fetch("https://e-learning.unitomo.ac.id/mhslearning/absen", {
      method: "POST",
      body: formData, 
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Cookie: cookie || "",
      },
    });

    const data = await res.text(); 
    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
