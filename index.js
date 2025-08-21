import express from "express";
import mongoose from "mongoose";
import Users from "./models/Users.js";

const app = express();
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is Online now 🚀");
});

async function dbConnect () {
  try {
    await mongoose.connect('mongodb+srv://shadow:shadow11@cluster0.z3p61vh.mongodb.net/')
    console.log('database connected')
  } catch (error) {
    console.log(error)
  }
}

dbConnect()

// Root Route
app.get("/", (req, res) => {
  res.send({ message: " API Working 🚀" });
});


app.get('/users', async (req, res) => {
  try {
    const data = await Users.find();

    res.json({message: "users fetched", data: data})
  } catch (e) {
    console.log(e)
    res.status(500).json({message: "something went wrong"})
  }
})


app.post('/users', async (req, res) => {
  try {
    const {username, email, password, number} = req.body;

    const isEmailExists = await Users.findOne({email: email});

    if(isEmailExists){
      return res.status(500).json({
        message: "email already exists"
      })
    }

    const usernameExists = await Users.findOne({username: username});

    if(usernameExists){
      return res.status(500).json({
        message: "username already exists"
      })
    }


    await Users.create({username, email, password,number})

    res.json({message: "data saved"})
  } catch (e) {
    console.log(e)
    res.status(500).json({message: "something went wrong"})
  }
})

// // Create Account API
// app.post("/create-account", (req, res) => {
//   const { username, email, password, number } = req.body; 
//   let errors = [];

//   if (!username || !email || !password || !number) {
//     return res.status(400).json({ message: "All fields (username, email, password, number) are required" });
//   }

//   if (!email.includes("@") || !email.includes("gmail.com")) {
//     errors.push("Invalid email format");
//   }

//   if (password.length < 6) {
//     errors.push("Password must be at least 6 characters long");
//   }

//   if (!/^\d+$/.test(number)) {
//     errors.push("Number must contain only digits");
//   }

//   if (errors.length > 0) {
//     return res.status(400).json({ errors });
//   }

//   res.json({ message: "Account created successfully!" });
// });
