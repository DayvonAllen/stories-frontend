import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "GET") {
    if (req.headers.cookie) {
      const cookieValue = cookie.parse(req.headers.cookie);
      if (
        cookieValue?.token?.toLowerCase().includes("bearer ") &&
        cookieValue?.token?.includes("|")
      )
        res.status(200).json({ user: "ok" });
      else res.status(400).json({ message: "Bad Request" });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req?.method} not allowed` });
  }
};
