import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { prisma } from "#/shared/database/index.js";
import ClientError from "#/shared/exceptions/client_error.js";
import {
    generateSessionSecret,
    hashSessionSecret,
    createSessionToken,
} from "#/shared/lib/session_manager.js";

/**
 * Selesaikan proses signup: ambil SignupSession yang sudah verified, buat
 * User baru, lalu hapus SignupSession-nya. Dipanggil dari /register, yang
 * mensyaratkan signup_session_token cookie (lihat requireSignupSession()).
 *
 * @param {object} signupSession - req.signupSession, dari requireSignupSession()
 * @param {string} username
 * @param {string} password
 */
export async function register(signupSession, username, password) {
    if (!signupSession.is_email_verified) {
        throw ClientError.forbidden("Alamat email belum di-verifikasi");
    }

    // Re-check, jaga-jaga ada race condition antara verifikasi email dan
    // register (e.g. dua tab/request bersamaan pakai email yang sama).
    const exists = await prisma.user.findUnique({
        where: { email_address: signupSession.email_address },
    });
    if (exists) {
        throw ClientError.conflict("Email address sudah di register sebelum nya");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                id: nanoid(),
                email_address: signupSession.email_address,
                username,
                password_hash: Buffer.from(passwordHash),
            },
        });
        await tx.signupSession.delete({ where: { id: signupSession.id } });
        return user;
    });

    const token = await createAuthSessionForUser(user.id);
    return { token, user };
}

export async function login(emailAddress, password) {
    const user = await prisma.user.findUnique({
        where: { email_address: emailAddress },
    });
    if (!user) {
        throw ClientError.unauthorized("Email address atau password salah");
    }

    const passwordMatches = await bcrypt.compare(
        password,
        Buffer.from(user.password_hash).toString(),
    );
    if (!passwordMatches) {
        throw ClientError.unauthorized("Email address atau password salah");
    }

    const token = await createAuthSessionForUser(user.id);
    return { token, user };
}

/**
 * @param {string} userId
 * @returns {Promise<string>} session token
 */
async function createAuthSessionForUser(userId) {
    const secret = generateSessionSecret();
    const authSession = await prisma.authSession.create({
        data: {
            id: nanoid(),
            user_id: userId,
            session_secret_hash: hashSessionSecret(secret),
            expires_at: new Date(Date.now() + process.env.SESSION_TOKEN_AGE),
        },
    });
    return createSessionToken(authSession.id, secret);
}

export async function findAuthSession(id) {
    return prisma.authSession.findUnique({
        where: { id },
    });
}

export async function logout(id) {
    try {
        await prisma.authSession.delete({ where: { id } });
    } catch (err) {
        if (err.code === "P2025") {
            throw ClientError.notFound("Session tidak ditemukan");
        }
        throw err;
    }
}