/*
  Warnings:

  - The primary key for the `Todos` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Todos" DROP CONSTRAINT "Todos_pkey",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Todos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Todos_id_seq";
