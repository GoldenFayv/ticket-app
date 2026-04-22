/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_id` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `ticket_type_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_ticket_id_fkey`;

-- DropIndex
DROP INDEX `OrderItem_ticket_id_fkey` ON `OrderItem`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `transaction_id`;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `ticket_id`,
    ADD COLUMN `ticket_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_ticket_type_id_fkey` FOREIGN KEY (`ticket_type_id`) REFERENCES `TicketType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
