-- CreateTable
CREATE TABLE "grass"."telegram_user" (
    "id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "telegram_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grass"."telegram_users_to_grass_accounts" (
    "telegram_user_id" INTEGER NOT NULL,
    "grass_user_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),

    CONSTRAINT "telegram_users_to_grass_accounts_pkey" PRIMARY KEY ("telegram_user_id","grass_user_id")
);
