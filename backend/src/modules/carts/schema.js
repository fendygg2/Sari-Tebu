import Joi from "joi";

export const addItemToCartSchema = Joi.object({
    product_id: Joi.string().required(),
});

export const editItemFromCartSchema = Joi.object({
    quantity: Joi.number().integer().min(0).required(),
});
