import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  email: string;
  role: "Admin" | "Faculty" | "Student";
  name: string;
};

type ResponseData = {
  success?: boolean;
  user?: User;
  token?: string;
  error?: string;
};

// Hardcoded users for demo
const users: User[] = [
  {
    email: "admin@gmail.com",
    role: "Admin",
    name: "Admin User",
  },
  {
    email: "faculty@gmail.com",
    role: "Faculty",
    name: "Faculty User",
  },
  {
    email: "student@gmail.com",
    role: "Student",
    name: "Student User",
  },
];

const passwords: Record<string, string> = {
  "admin@gmail.com": "1234",
  "faculty@gmail.com": "1111",
  "student@gmail.com": "1212",
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Check if user exists and password matches
  const user = users.find((u) => u.email === email.toLowerCase());
  const correctPassword = passwords[email.toLowerCase()];

  if (!user || password !== correctPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Generate a simple token (in production, use JWT)
  const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

  return res.status(200).json({
    success: true,
    user: {
      email: user.email,
      role: user.role,
      name: user.name,
    },
    token,
  });
}

