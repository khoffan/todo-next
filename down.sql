-- AlterTable
ALTER TABLE "Todos" DROP CONSTRAINT "Todos_pkey",
DROP COLUMN "updated_at",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Todos_pkey" PRIMARY KEY ("id");

