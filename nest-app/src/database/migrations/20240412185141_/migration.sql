-- CreateTable
CREATE TABLE "VoteOption" (
    "value" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "nameFr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descriptionFr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "shortDescFr" TEXT NOT NULL,
    "shortDescEn" TEXT NOT NULL,

    CONSTRAINT "VoteOption_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "Vote" (
    "login" TEXT NOT NULL,
    "voteOptionValue" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("login")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voteOptionValue_fkey" FOREIGN KEY ("voteOptionValue") REFERENCES "VoteOption"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
