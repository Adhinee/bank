const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");  // Import bcrypt for hashing passwords
const AccModels = require('./models/acc');  // Import the AccModels schema
const UserModels = require("./models/userdata");
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://bank:Bank%40123@cluster0.alh1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/bank/bankdb")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Failed to connect to MongoDB", err));

// Route for the root URL '/'
app.get("/", (req, res) => {
    res.send("Server is running successfully on port 5000");
});

// Login Route
app.post("/login", (req, res) => {
    const { userName, password } = req.body;
    AccModels.findOne({ userName: userName })
        .then(user => {
            if (user) {
                // Compare the entered password with the hashed password in the database
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            res.json("success");
                        } else {
                            res.json("The password is incorrect");
                        }
                    })
                    .catch(err => res.status(500).json("Error comparing passwords"));
            } else {
                res.json("No user found");
            }
        })
        .catch(err => res.status(500).json("Error: " + err));
});

// Signup Route
app.post("/Signup", (req, res) => {
    const { userName, password, id } = req.body;

    // Check if the username already exists
    AccModels.findOne({ userName: userName })
        .then(user => {
            if (user) {
                return res.json("Username is already taken");
            } else {
                // Hash the password before saving to DB
                bcrypt.hash(password, 10)  // Generate a salt and hash the password
                    .then(hashedPassword => {
                        // Create new user with hashed password
                        AccModels.create({ userName, password: hashedPassword, id })
                            .then(acc => res.json(acc))
                            .catch(err => res.status(500).json("Error creating account: " + err));
                    })
                    .catch(err => res.status(500).json("Error hashing password: " + err));
            }
        })
        .catch(err => res.status(500).json("Error checking username: " + err));
});

app.post("/user", (req, res) => {
    const { description, cash, id , total ,dataid} = req.body;

    UserModels.create({ description:description, cash:cash, id:id , total:total ,dataid:dataid})
        .then(acc => res.json({ message: "User data created", user: acc }))
        .catch(err => res.status(500).json({ error: "Error creating user data", details: err.message }));
});



app.delete("/delete", (req, res) => {
    const { dataid } = req.query;  // Access 'dataid' from query params

    console.log("Received dataid:", dataid);  // Log the received dataid

    if (!dataid) {
        return res.status(400).json({ message: "Data ID is required" });
    }

    // Try to find the document to delete
    UserModels.deleteOne({ dataid: dataid })
        .then(result => {
            console.log("Delete result:", result);  // Log the result of the delete operation

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "No data found to delete" });
            }
            res.json({ message: "User data deleted successfully", result });
        })
        .catch(err => {
            console.error("Error deleting user data:", err);
            res.status(500).json({ error: "Error deleting user data", details: err.message });
        });
});





app.get('/getAcc', (req, res) => {
    AccModels.find()
        .then(bank => res.json(bank))
        .catch(err => res.json(err));
});

app.get('/getUser', (req, res) => {
    UserModels.find()
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
