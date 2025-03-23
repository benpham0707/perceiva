-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analogy" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Analogy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedAnalogy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "analogyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedAnalogy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SavedAnalogy_userId_analogyId_key" ON "SavedAnalogy"("userId", "analogyId");

-- AddForeignKey
ALTER TABLE "Analogy" ADD CONSTRAINT "Analogy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedAnalogy" ADD CONSTRAINT "SavedAnalogy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedAnalogy" ADD CONSTRAINT "SavedAnalogy_analogyId_fkey" FOREIGN KEY ("analogyId") REFERENCES "Analogy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
