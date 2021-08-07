import { API_URL } from "@/config/index";
import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const backendRes = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password,
      }),
    });

    const data = await backendRes.json();

    if (backendRes.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data?.data, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: "ok" });
    } else {
      res.status(401).json({ message: "Wrong Username or Password" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req?.method} not allowed` });
  }
};
