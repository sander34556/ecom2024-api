/*
  Warnings:

  - You are about to drop the column `enable` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `enable`,
    ADD COLUMN `enabled` BOOLEAN NOT NULL DEFAULT true;
