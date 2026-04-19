/*
  Warnings:

  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_event_id_fkey`;

-- DropTable
DROP TABLE `Ticket`;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `total_price` DOUBLE NOT NULL,
    `order_id` INTEGER NOT NULL,
    `ticket_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reference` VARCHAR(191) NOT NULL,
    `buyer_name` VARCHAR(191) NOT NULL,
    `buyer_email` VARCHAR(191) NOT NULL,
    `buyer_phone` VARCHAR(191) NULL,
    `total_amount` DOUBLE NOT NULL,
    `payment_status` ENUM('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `paidAt` DATETIME(3) NULL,
    `transaction_id` INTEGER NULL,
    `event_id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Order_reference_key`(`reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `purchased_quantity` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TicketType_name_event_id_key`(`name`, `event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `TicketType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketType` ADD CONSTRAINT `TicketType_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
