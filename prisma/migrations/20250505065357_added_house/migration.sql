-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);
