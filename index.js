import express from "express";
import mongoose from "mongoose";
import Users from "./models/users.js";

const app = express();
app.use(express.json());

// connect to db (once per cold start)
async function dbConnect() {
  try {
    await mongoose.connect('mongodb+srv://shadow:shadow11@cluster0.z3p61vh.mongodb.net/mydb');
    console.log("database connected");
  } catch (error) {
    console.error(error);
  }
}

dbConnect();

// Root Route
app.get("/", (req, res) => {
  res.send({ message: "API Working 🚀" });
});

app.get("/users", async (req, res) => {
  try {
    const data = await Users.find();
    res.json({ message: "users fetched", data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { username, email, password, number } = req.body;

    const isEmailExists = await Users.findOne({ email });
    if (isEmailExists) {
      return res.status(400).json({ message: "email already exists" });
    }

    const usernameExists = await Users.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "username already exists" });
    }

    await Users.create({ username, email, password, number });

    res.status(201).json({ message: "data saved" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "something went wrong" });
  }
});

// ✅ export app for Vercel
export default app;
