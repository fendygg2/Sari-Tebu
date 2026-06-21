import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import authenticationRoutes from "#/modules/authentications/routes.js";
import cartRoutes from "#/modules/carts/routes.js";
import productRoutes from "#/modules/products/routes.js";
import transactionRoutes from "#/modules/transactions/routes.js";
import userRoutes from "#/modules/users/routes.js";
import requireErrorHandler from "#/shared/middlewares/error_handler.js";

const app = express();

// NOTE: Pastikan `trust proxy` bersifat truthy kalau berada di belakang
// reverse-proxy (e.g. nginx, cloudflare, atau caddy).
app.set("trust proxy", process.env.REVERSE_PROXY);
app.use(cookieParser());
app.use(helmet());
app.use(
    cors({
        origin: process.env.CORS_ALLOWED_ORIGINS?.split(",") ?? [],
    }),
);
app.use(express.json({ limit: "250kb" }));
app.use(express.urlencoded({ extended: true, limit: "250kb" }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authenticationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/transactions", transactionRoutes);

// NOTE: Error middleware harus berada pada urutan terakhir
app.use(requireErrorHandler());

export default app;
