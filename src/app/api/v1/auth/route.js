// app/api/login/route.js
import puppeteer from "puppeteer";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();

    // buka halaman login
    await page.goto(`${process.env.URL_TARGET}/login`, {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    // isi form login
    await page.type("#username", username, { delay: 50 });
    await page.type("#password", password, { delay: 50 });

    // klik tombol login
    await page.click("button[type=button]");

    // tunggu salah satu:
    // 1) redirect ke dashboard
    // 2) muncul pesan error
    const loginResult = await Promise.race([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 5000 }),
      page.waitForSelector(".alert-danger", { timeout: 5000 }).then(() => "error"),
    ]);

    if (loginResult === "error") {
      await browser.close();
      return Response.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // kalau berhasil login, ambil cookies
    const cookies = await page.cookies();
    const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join("; ");

    await browser.close();

    return Response.json({
      message: "Authentication successful",
      token: cookieHeader,
      user: {
        nim: username
      }
      // cookies,
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { message: "Authentication failed", error: error.message },
      { status: 500 }
    );
  }
}
