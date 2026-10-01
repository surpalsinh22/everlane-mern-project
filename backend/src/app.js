import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js'
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


const app = express();

// ===============================
// Middlewares
// ===============================

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===============================
// Routes
// ===============================

app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes)
// Cart routes
app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

// ===============================
// Base Route
// ===============================

app.get('/', (req, res) => {
  res.send('Everlane API is running...');
});

export default app;