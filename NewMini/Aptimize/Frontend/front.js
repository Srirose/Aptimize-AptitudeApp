// const express = require("express");
// const mysql = require("mysql");
// const bcrypt = require("bcrypt");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "aptimize_users"
// });

// db.connect(err => {
//     if (err) {
//         console.error("Database connection failed: " + err.stack);
//         return;
//     }
//     console.log("Connected to MySQL database");
// });

// app.post("/api/login", (req, res) => {
//     const { email, password } = req.body;

//     const sql = "SELECT * FROM users WHERE email = ?";
//     db.query(sql, [email], (err, result) => {
//         if (err) return res.status(500).json({ success: false, message: "Database error" });

//         if (result.length === 0) {
//             return res.status(401).json({ success: false, message: "User not found" });
//         }

//         const user = result[0];

//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) return res.status(500).json({ success: false, message: "Error comparing passwords" });

//             if (isMatch) {
//                 res.json({ success: true, user: { id: user.id, email: user.email } });
//             } else {
//                 res.status(401).json({ success: false, message: "Invalid password" });
//             }
//         });
//     });
// });

// app.listen(5000, () => {
//     console.log("Server running on port 5000");
// });
