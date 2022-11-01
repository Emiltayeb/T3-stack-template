/*
  Warnings:

  - Made the column `access_token` on table `account` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `access_token` TEXT NOT NULL;
