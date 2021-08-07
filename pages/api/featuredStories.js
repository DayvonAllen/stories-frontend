import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    // Destroy cookie
    const backendRes = await fetch(`${API_URL}/stories/featured`);
    const data = await backendRes.json();

    if (backendRes.ok) {
      res.status(200).json({ data });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req?.method} not allowed` });
  }
};