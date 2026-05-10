/**
 * pada Express 5, error yang di throw akan lgsg di propogate ke Error Middleware
 * sehingga kita bisa lgsg throw error tanpa diwajibkan untuk manually pass ke next()
 */

export function validatePayload(schema) {
    return function (req, res, next) {
        const { value, error } = schema.validate(req.body);
        if (error) throw error;

        req.body = value;
        next();
    };
}

export function validateQuery(schema) {
    return function (req, res, next) {
        // properti query bersifat read only pada Express 5
        const { value, error } = schema.validate(req.query);
        if (error) throw error;

        req.validatedQuery = value;
        next();
    };
}
