/*
  Warnings:

  - Added the required column `thumbnail_url` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "thumbnail_url" TEXT NOT NULL;
