import { API_URL } from "@/config/index";
export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const backendRes = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    await backendRes.json();

    if (backendRes.ok) {
      res.status(200).json({ user: "ok" });
    } else if (backendRes.status === 409) {
      res
        .status(409)
        .json({ message: "A user with that email or username already exists" });
    } else {
      res.status(400).json({ message: "Bad Data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req?.method} not allowed` });
  }
};
