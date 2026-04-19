-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'USED', 'CANCELLED') NOT NULL DEFAULT 'ACTIVE',
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `usedAt` DATETIME(3) NULL,
    `event_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `ticket_type_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ticket_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ticket_type_id_fkey` FOREIGN KEY (`ticket_type_id`) REFERENCES `TicketType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
