import { API_URL } from "@/config/index";
import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "POST") {
    const { title, content } = req.body;

    const { token } = cookie.parse(req.headers.cookie);

    const backendRes = await fetch(`${API_URL}/stories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        content,
        tags: [
          {
            value: "TrueScaryStory",
          },
        ],
      }),
    });

    await backendRes.json();

    if (backendRes.ok) {
      res.status(200).json({ user: "ok" });
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
