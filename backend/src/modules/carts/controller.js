import * as CartService from "./service.js";

/**
 * @typedef {import('express').Request & {
 *     validatedBody  : any,
 *     validatedQuery : any,
 *     validatedParams: any
 * }} Request
 * @typedef {Request & {
 *     user: {
 *         sub: string,
 *         sid: string
 *     }
 * }} RequestWithAuth
 * @typedef {import('express').Response} Response
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function addItemToCart(req, res) {}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function editItemFromCart(req, res) {}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function removeItemFromCart(req, res) {}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function getItemsFromCart(req, res) {}

/**
 * @param {Request} req
 * @param {Response} res
 * @type {import("express").RequestHandler}
 * @returns {Promise<void>}
 */
export async function deleteCart(req, res) {}
