import { Router } from "express";

import requireRateLimit from "#/shared/middlewares/rate_limit.js";
import requireSession from "#/shared/middlewares/session.js";
import requireValidation from "#/shared/middlewares/validation.js";

import {
    createSignupSession,
    verifyEmailAddress,
    sendVerificationCode,
} from "./controller.js";
import {
    createSignupSessionSchema,
    verifyEmailAddressSchema,
} from "./schema.js";

const requireSignupSession = requireSession({
    cookieName: "signup_session_token",
    requestKey: "signupSession",
    findSessionFn: (id) => {
        prisma.signup_session.findUnique({ where: { id } });
    },
});

const routes = Router();

routes.post("/", [
    requireValidation("body", createSignupSessionSchema),
    createSignupSession,
]);

routes.post("/verify-email-address", [
    requireValidation("body", verifyEmailAddressSchema),
    requireSignupSession(),
    verifyEmailAddress,
]);

routes.post("/send-verification-code", [
    requireRateLimit(1000, 5, 5 * 60 * 1000),
    requireSignupSession(),
    sendVerificationCode,
]);

export default routes;
