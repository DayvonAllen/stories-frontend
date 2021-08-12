import { API_URL } from "@/config/index";
import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "POST") {
    const { token } = cookie.parse(req.headers.cookie);

    const backendRes = await fetch(
      `${API_URL}/read/${JSON.parse(req.body).id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    await backendRes.json();

    if (backendRes.ok) {
      res.status(201).json({ data: "created" });
    } else if (backendRes.status === 400) {
      res
        .status(400)
        .json({ message: "There was a problem saving your story" });
    } else {
      res.status(400).json({ message: "Bad Data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req?.method} not allowed` });
  }
};
