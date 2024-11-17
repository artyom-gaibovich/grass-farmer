-- CreateTable
CREATE TABLE "grass"."grass_users" (
    "id" TEXT NOT NULL,
    "proxies" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "grass_users_pkey" PRIMARY KEY ("id")
);
