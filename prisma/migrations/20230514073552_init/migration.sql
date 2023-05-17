-- CreateTable
CREATE TABLE "RegistrationRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nid" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "dob" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "faculty" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationRequest_email_key" ON "RegistrationRequest"("email");
