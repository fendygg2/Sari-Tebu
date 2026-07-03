import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import { prisma } from "#/shared/database/index.js";
import ClientError from "#/shared/exceptions/client_error.js";

const publicUserField = {
    id: true,
    email_address: true,
    username: true,
    created_at: true,
    updated_at: true,
};

export async function createUser({ emailAddress, username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        return await prisma.user.create({
            data: {
                id: `user-${nanoid()}`,
                email_address: emailAddress,
                username,
                password_hash: hashedPassword,
            },
            select: publicUserField,
        });
    } catch (err) {
        if (err.code === "P2002") {
            throw ClientError.conflict("Email address sudah digunakan");
        }
        throw err;
    }
}

export async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id: id },
        select: publicUserField,
    });
    if (!user) {
        throw ClientError.notFound("User dengan id tersebut tidak ditemukan");
    }
    return user;
}

export async function getUsers(emailAddress = "") {
    return await prisma.user.findMany({
        where: {
            email_address: emailAddress ? emailAddress : undefined,
        },
        select: publicUserField,
    });
}

export async function updateUser(id, payload) {
    try {
        return await prisma.user.update({
            where: { id },
            data: payload,
            select: publicUserField,
        });
    } catch (err) {
        if (err.code === "P2002") {
            throw ClientError.conflict("Email address sudah digunakan");
        }
        if (err.code === "P2025") {
            throw ClientError.notFound("User tidak ditemukan");
        }
        throw err;
    }
}

export async function deleteUser(id) {
    try {
        await prisma.user.delete({
            where: { id: id },
        });
    } catch (err) {
        if (err.code === "P2025")
            throw ClientError.notFound("User tidak ditemukan");
        throw err;
    }
}

// TODO: USER PASSWORD
// async function verifyUserPasswordStrength(password) {
//     const passwordHash = crypto
//         .createHash("sha1")
//         .update(password)
//         .digest("hex");

//     const hashPrefix = passwordHash.slice(0, 5);
//     const url = `https://api.pwnedpasswords.com/range/${hashPrefix}`;
    
//     const res = await fetch(url);
//     if (!res.ok) {
//         throw new Error(`Received status code ${res.status}`);
//     }

//     const lines = await res.text();
//     for (const line of lines.split("\n")) {
//         const hashSuffix = line.slice(0, 35).toLowerCase();
//         if (passwordHash === hashPrefix + hashSuffix) {
//             return false;
//         }
//     }

//     return true;
// }

// function verifyUserPasswordPattern(password) {
//       if (password.length < 10 || password.length > 100) {
//             return false;
//       }

//       for (const char of password) {
//             const code = char.charCodeAt(0);
//             if (code < 0x20 || code > 0x7e) {
//                 return false;
//             }
//       }

//       if (password[0] === " " || password[password.length - 1] === " ") {
//             return false;
//       }

//       return true;
// }
