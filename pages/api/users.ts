import { connectDB } from "@/data/database/mangodb";
import users from "@/data/models/users";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "GET") {
      await connectDB();
      const all = await users.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ users: all });
    }

    if (req.method === "POST") {
      await connectDB();
      const data = req.body;
      const userDoc = new users(data);
      await userDoc.save();
      console.log("Created user:", userDoc);
      return res.status(200).json({ message: "User created", user: userDoc });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error handling users request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
