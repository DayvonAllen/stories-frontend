import { API_URL } from "@/config/index";
import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "GET") {
    const { token } = cookie.parse(req.headers.cookie || "");

    const backendRes = await fetch(`${API_URL}/stories`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const stories = await backendRes.json();

    if (backendRes.ok) {
      res.status(200).json({ stories: stories?.data });
    } else if (backendRes.status === 401) {
      res.status(500).json({ message: "There was a problem fetching stories" });
    } else if (backendRes.status === 400) {
      res.status(500).json({ message: "There was a problem fetching stories" });
    } else {
      res.status(500).json({ message: "There was a problem fetching stories" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req?.method} not allowed` });
  }
};
