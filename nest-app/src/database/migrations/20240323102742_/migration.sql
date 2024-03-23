/*
  Warnings:

  - The primary key for the `VoteOption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `VoteOption` table. All the data in the column will be lost.
  - Added the required column `coverUrl` to the `VoteOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEn` to the `VoteOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionFr` to the `VoteOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `VoteOption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFr` to the `VoteOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VoteOption" DROP CONSTRAINT "VoteOption_pkey",
DROP COLUMN "id",
ADD COLUMN     "coverUrl" TEXT NOT NULL,
ADD COLUMN     "descriptionEn" TEXT NOT NULL,
ADD COLUMN     "descriptionFr" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameFr" TEXT NOT NULL,
ADD CONSTRAINT "VoteOption_pkey" PRIMARY KEY ("value");

-- CreateTable
CREATE TABLE "Vote" (
    "login" TEXT NOT NULL,
    "voteOptionValue" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("login")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voteOptionValue_fkey" FOREIGN KEY ("voteOptionValue") REFERENCES "VoteOption"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
