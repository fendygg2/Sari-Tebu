import * as UserService from "./service.js";

export async function createUser(req, res) {
    const user = await UserService.createUser(req.validatedBody);
    res.status(201).json({
        status: "success",
        data: { user },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function getUsers(req, res) {
    const { email_address } = req.validatedQuery ?? {};
    const users = await UserService.getUsers(email_address);
    res.status(200).json({
        status: "success",
        data: { users },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function getUserById(req, res) {
    const user = await UserService.getUserById(req.validatedParams.id);
    res.status(200).json({
        status: "success",
        data: { user },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function updateUser(req, res) {
    const user = await UserService.updateUser(
        req.validatedParams.id,
        req.validatedBody,
    );
    res.status(200).json({
        status: "success",
        data: { user },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function editUser(req, res) {
    const user = await UserService.updateUser(
        req.validatedParams.id,
        req.validatedBody,
    );
    res.status(200).json({
        status: "success",
        data: { user },
    });
}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function deleteUser(req, res) {
    await UserService.deleteUser(req.validatedParams.id);
    res.status(200).json({
        status: "success",
        message: "User berhasil dihapus",
    });
}
