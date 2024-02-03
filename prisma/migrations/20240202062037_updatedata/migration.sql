/*
  Warnings:

  - The values [descripstion] on the enum `MetaAi_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `metaai` MODIFY `type` ENUM('keywords', 'description') NOT NULL,
    MODIFY `keyword` LONGTEXT NOT NULL;
