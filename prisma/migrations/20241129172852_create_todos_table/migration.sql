-- CreateTable
CREATE TABLE "Todos" (
    "id" SERIAL NOT NULL,
    "todo_name" TEXT NOT NULL,
    "todo_status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Todos_pkey" PRIMARY KEY ("id")
);
