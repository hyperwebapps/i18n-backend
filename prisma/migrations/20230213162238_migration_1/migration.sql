-- CreateTable
CREATE TABLE `Folder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `is_active` CHAR(1) NOT NULL DEFAULT '1',

    UNIQUE INDEX `uuid`(`uuid`),
    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Label` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(255) NOT NULL,
    `folder_id` INTEGER NULL,
    `en` TEXT NULL,
    `ru` TEXT NULL,
    `ch` TEXT NULL,
    `is_active` CHAR(1) NOT NULL DEFAULT '1',

    UNIQUE INDEX `uuid`(`uuid`),
    INDEX `folder_id`(`folder_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(2000) NOT NULL,
    `is_active` CHAR(1) NOT NULL DEFAULT '1',

    UNIQUE INDEX `uuid`(`uuid`),
    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Label` ADD CONSTRAINT `labels_ibfk_1` FOREIGN KEY (`folder_id`) REFERENCES `Folder`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
