import { nanoid } from "nanoid";

import { prisma } from "#/shared/database/index.js";
import ClientError from "#/shared/exceptions/client_error.js";

export async function editItemFromCart() {}
export async function addItemToCart() {
    const cartItem = await prisma.cartItem.create({
        data: {},
    });
}
export async function removeItemFromCart() {}
export async function getItemsFromCart() {}
export async function deleteCart() {}
