/*
  Warnings:

  - You are about to drop the column `session_secret` on the `account_deletion_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_secret` on the `auth_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_secret` on the `email_address_update_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_secret` on the `password_reset_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_secret` on the `password_update_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_secret` on the `signup_sessions` table. All the data in the column will be lost.
  - Added the required column `session_secret_hash` to the `account_deletion_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_secret_hash` to the `auth_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_secret_hash` to the `email_address_update_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_secret_hash` to the `password_reset_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_secret_hash` to the `password_update_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_secret_hash` to the `signup_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account_deletion_sessions` DROP COLUMN `session_secret`,
    ADD COLUMN `session_secret_hash` BLOB NOT NULL;

-- AlterTable
ALTER TABLE `auth_sessions` DROP COLUMN `session_secret`,
    ADD COLUMN `session_secret_hash` BLOB NOT NULL;

-- AlterTable
ALTER TABLE `email_address_update_sessions` DROP COLUMN `session_secret`,
    ADD COLUMN `session_secret_hash` BLOB NOT NULL;

-- AlterTable
ALTER TABLE `password_reset_sessions` DROP COLUMN `session_secret`,
    ADD COLUMN `session_secret_hash` BLOB NOT NULL;

-- AlterTable
ALTER TABLE `password_update_sessions` DROP COLUMN `session_secret`,
    ADD COLUMN `session_secret_hash` BLOB NOT NULL;

-- AlterTable
ALTER TABLE `signup_sessions` DROP COLUMN `session_secret`,
    ADD COLUMN `session_secret_hash` BLOB NOT NULL;
