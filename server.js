// ==================== 1. Initial Checks ====================
require('dotenv').config();

// JWT Secret Check
if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET environment variable missing!");
}

// ==================== 2. Express + Firebase Setup ====================
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Firebase Admin SDK Initialization
// Option 1: Service Account JSON file (local dev)
// const serviceAccount = require("./firebase-admin-key.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// Option 2: Environment Variables (Recommended for Render)
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  })
});

const app = express();

// ==================== 3. Middlewares ====================
app.use(cors({
  origin: [
    "https://your-frontend-domain.com", // Production
    "http://localhost:3000"            // Development
  ],
  credentials: true
}));

app.use(express.json());

// ==================== 4. Routes ====================
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

// ==================== 5. Health Check ====================
app.get("/api", (req, res) => {
  res.send("🚀 Hybrid Auth (Firebase + JWT) Backend is Running on Render!");
});

// ==================== 6. Start Server ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
