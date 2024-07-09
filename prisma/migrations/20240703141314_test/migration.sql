/*
  Warnings:

  - Added the required column `title` to the `ToDo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ToDo" ADD COLUMN     "title" TEXT NOT NULL;
