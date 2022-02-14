import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

const csrfProtection = csrf({ cookie: true });

// connect to database
mongoose.connect(process.env.DATABASE, {}, () => {
  console.log("**mongodb connected**");
});

// apply middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port: ${port}`));
