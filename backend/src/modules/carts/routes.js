import { Router } from "express";

import requireAuth from "#/shared/middlewares/auth_middleware.js";
import { validatePayload } from "#/shared/middlewares/validate_middleware.js";

import {
    addItemToCart,
    editItemFromCart,
    removeItemFromCart,
    getItemsFromCart,
    deleteCart,
} from "./controller.js";
import { addItemToCartSchema, editItemFromCartSchema } from "./schema.js";

const routes = Router();

routes.post("/items", [
    requireAuth,
    validatePayload(addItemToCartSchema),
    addItemToCart,
]);
routes.patch("/items/:productId", [
    requireAuth,
    validatePayload(editItemFromCartSchema),
    editItemFromCart,
]);
routes.delete("/items/:productId", [requireAuth, removeItemFromCart]);

routes.get("/", [requireAuth, getItemsFromCart]);
routes.delete("/", [requireAuth, deleteCart]);

export default routes;
