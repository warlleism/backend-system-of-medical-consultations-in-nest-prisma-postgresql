/*
  Warnings:

  - Added the required column `phone` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "phone" TEXT NOT NULL;
