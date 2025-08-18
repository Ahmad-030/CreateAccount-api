import express from "express";

const app = express();
app.use(express.json());

app.listen(5000, () => {
    console.log("Server is Online now");
});

// Create Account API
app.post('/create-account', (req, res) => {
    console.log("Received body:", req.body); 

    const { username, email, password, number } = req.body; 
    let errors = [];

    if (!username || !email || !password || !number) {
        return res.status(400).json({ message: 'All fields (username, email, password, number) are required' });
    }

    if (!email.includes('@') || !email.includes('gmail.com')) {
        errors.push('Invalid email format');
    }

    if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (!/^\d+$/.test(number)) {
        errors.push('Number must contain only digits');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    res.json({ message: 'Account created successfully!' });
});

// Simple health check
app.get("/on", (req, res) => {
    res.send({ message: "server is on" });
});
