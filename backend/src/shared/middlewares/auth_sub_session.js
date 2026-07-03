// shared/middlewares/auth_sub_session.js
import ClientError from "#/shared/exceptions/client_error.js";
import requireSession from "./session.js";

/**
 * Factory untuk sub-session yang bergantung ke AuthSession yang sedang aktif
 * (account_deletion_sessions, email_address_update_sessions, password_update_sessions).
 *
 * Middleware ini harus dipasang setelah requireAuthSession(), karena dia
 * memvalidasikan bahwa sub-session yang ditemukan memang milik
 * req.authSession yang sedang login.
 *
 * @param {object} options
 * @param {string} options.cookieName
 * @param {string} options.requestKey
 * @param {(id: string) => Promise<object | null>} options.findSessionFn
 */
export default function requireAuthSubSession({
    cookieName,
    requestKey,
    findSessionFn,
}) {
    const baseMiddleware = requireSession({
        cookieName,
        requestKey,
        findSessionFn,
    })();

    return async function (req, res, next) {
        if (!req.authSession) {
            throw new Error(
                "requireAuthSubSession() harus dipasang setelah requireAuthSession()",
            );
        }

        await baseMiddleware(req, res, () => {
            if (req[requestKey].auth_session_id !== req.authSession.id) {
                throw ClientError.forbidden("Session tidak valid untuk akun ini");
            }
            next();
        });
    };
}