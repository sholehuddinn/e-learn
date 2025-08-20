export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const res = await fetch(`${process.env.URL_TARGET}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username,
        password,
      }).toString(),
      redirect: "manual", 
    });

    const setCookie = res.headers.get("set-cookie");

    let cookieHeader = "";
    if (setCookie) {
      cookieHeader = setCookie.split(";")[0];
    }


    const html = await res.text();

    if (html.includes("alert-danger")) {
      return Response.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    return Response.json({
      message: "Authentication successful",
      token: cookieHeader,
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { message: "Authentication failed", error: error.message },
      { status: 500 }
    );
  }
}
