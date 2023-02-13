/*
  Warnings:

  - You are about to alter the column `is_active` on the `Folder` table. The data in that column could be lost. The data in that column will be cast from `Char(1)` to `TinyInt`.
  - You are about to alter the column `is_active` on the `Label` table. The data in that column could be lost. The data in that column will be cast from `Char(1)` to `TinyInt`.
  - You are about to alter the column `is_active` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Char(1)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Folder` MODIFY `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Label` MODIFY `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `User` MODIFY `is_active` BOOLEAN NOT NULL DEFAULT true;
