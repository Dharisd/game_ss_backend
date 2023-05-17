/*
  Warnings:

  - Added the required column `payment_slip` to the `RegistrationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RegistrationRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nid" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "dob" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "payment_slip" TEXT NOT NULL
);
INSERT INTO "new_RegistrationRequest" ("dob", "email", "faculty", "id", "name", "nid", "phone_number") SELECT "dob", "email", "faculty", "id", "name", "nid", "phone_number" FROM "RegistrationRequest";
DROP TABLE "RegistrationRequest";
ALTER TABLE "new_RegistrationRequest" RENAME TO "RegistrationRequest";
CREATE UNIQUE INDEX "RegistrationRequest_email_key" ON "RegistrationRequest"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
