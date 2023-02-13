/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Label` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Label` ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `name` ON `Label`(`name`);
