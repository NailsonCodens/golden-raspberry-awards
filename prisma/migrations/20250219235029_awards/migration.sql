-- CreateTable
CREATE TABLE "awards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "studios" TEXT NOT NULL,
    "producers" TEXT NOT NULL,
    "winner" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "awards_year_title_key" ON "awards"("year", "title");
