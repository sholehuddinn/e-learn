export async function POST(req) {
  try {
    const { nim, pin } = await req.json();

    const res = await fetch(`${process.env.LIK_TARGET}/welcome`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        Origin: process.env.LIK_TARGET,
        Referer: `${process.env.LIK_TARGET}/welcome`,
      },
      body: new URLSearchParams({
        nim,
        pin,
      }).toString(),
      redirect: "manual", 
    });

    const rawCookies = res.headers.get("set-cookie");

    if (!rawCookies) {
      return Response.json(
        { message: "Login failed, no cookies returned" },
        { status: 401 }
      );
    }

    const match = rawCookies.match(/unitomo_lik=[^;]+/);

    if (!match) {
      return Response.json(
        { message: "Login failed, unitomo_lik not found", rawCookies },
        { status: 401 }
      );
    }

    return Response.json({
      message: "Login success",
      token: match[0], 
    });
  } catch (err) {
    console.error("Login error:", err);
    return Response.json(
      { message: "Login failed", error: err.message },
      { status: 500 }
    );
  }
}
