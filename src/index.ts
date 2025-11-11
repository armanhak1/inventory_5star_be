import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import inventoryRouter from "./routes/inventory";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for Vite frontend
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"], // Vite default ports
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ 
    message: "5 Star Care Backend API ✅",
    database: "MongoDB Connected",
    endpoints: {
      inventory: "/api/inventory",
      clearAll: "DELETE /api/inventory/all"
    }
  });
});

// API Routes
app.use("/api/inventory", inventoryRouter);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📦 Inventory API: http://localhost:${PORT}/api/inventory`);
      console.log(`🗑️  Clear all: DELETE http://localhost:${PORT}/api/inventory/all`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();