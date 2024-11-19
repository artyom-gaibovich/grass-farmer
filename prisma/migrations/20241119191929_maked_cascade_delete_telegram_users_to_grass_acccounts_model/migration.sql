/*
  Warnings:

  - The primary key for the `telegram_users_to_grass_accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "grass"."telegram_users_to_grass_accounts" DROP CONSTRAINT "telegram_users_to_grass_accounts_pkey",
ALTER COLUMN "telegram_user_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "telegram_users_to_grass_accounts_pkey" PRIMARY KEY ("telegram_user_id", "grass_user_id");

-- AddForeignKey
ALTER TABLE "grass"."telegram_users_to_grass_accounts" ADD CONSTRAINT "telegram_users_to_grass_accounts_telegram_user_id_fkey" FOREIGN KEY ("telegram_user_id") REFERENCES "grass"."telegram_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grass"."telegram_users_to_grass_accounts" ADD CONSTRAINT "telegram_users_to_grass_accounts_grass_user_id_fkey" FOREIGN KEY ("grass_user_id") REFERENCES "grass"."grass_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
