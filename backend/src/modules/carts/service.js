import { nanoid } from "nanoid";

import { prisma } from "#/shared/database/index.js";
import ClientError from "#/shared/exceptions/client_error.js";

export async function createCart(userId) {
    return prisma.cart.create({
        data: { id: `cart-${nanoid()}`, user_id: userId },
    });
}

export async function listCarts() {
    return prisma.cart.findMany({
        include: { items: { include: { product: true } } },
        orderBy: { created_at: "desc" },
    });
}

export async function getCart(cartId) {
    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { items: { include: { product: true } } },
    });

    if (!cart) throw ClientError.notFound("Cart not found");
    return cart;
}

export async function deleteCart(cartId) {
    const cart = await prisma.cart.findUnique({ where: { id: cartId } });
    if (!cart) throw ClientError.notFound("Cart not found");
    return prisma.cart.delete({ where: { id: cartId } });
}

export async function addItemToCart(cartId, productId, quantity) {
    const [cart, product] = await Promise.all([
        prisma.cart.findUnique({ where: { id: cartId } }),
        prisma.product.findUnique({ where: { id: productId } }),
    ]);

    if (!cart || !product) throw ClientError.notFound();
    if (product.stock < quantity) throw ClientError.badRequest("Stok habis");

    return prisma.cartItem.upsert({
        where: {
            cart_id_product_id: { cart_id: cartId, product_id: productId },
        },
        create: { cart_id: cartId, product_id: productId },
        update: { quantity: { increment: quantity } },
    });
}

export async function updateItem(cartId, productId, quantity) {
    const item = await prisma.cartItem.findUnique({
        where: {
            cart_id_product_id: { cart_id: cartId, product_id: productId },
        },
    });

    if (!item) throw ClientError.notFound("Item tidak ditmukan dalam cart");
    if (quantity <= 0) return removeItem(cartId, productId);

    return prisma.cartItem.update({
        where: {
            cart_id_product_id: { cart_id: cartId, product_id: productId },
        },
        data: { quantity },
    });
}

export async function removeItem(cartId, productId) {
    const item = await prisma.cartItem.findUnique({
        where: {
            cart_id_product_id: { cart_id: cartId, product_id: productId },
        },
    });
    if (!item) throw ClientError.notFound("Item tidak ditemukan dalam cart");
    return prisma.cartItem.delete({
        where: {
            cart_id_product_id: { cart_id: cartId, product_id: productId },
        },
    });
}
