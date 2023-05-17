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
    "payment_slip" TEXT NOT NULL,
    "accepted" BOOLEAN DEFAULT false,
    "rejected_reason" TEXT
);
INSERT INTO "new_RegistrationRequest" ("accepted", "dob", "email", "faculty", "id", "name", "nid", "payment_slip", "phone_number", "rejected_reason") SELECT "accepted", "dob", "email", "faculty", "id", "name", "nid", "payment_slip", "phone_number", "rejected_reason" FROM "RegistrationRequest";
DROP TABLE "RegistrationRequest";
ALTER TABLE "new_RegistrationRequest" RENAME TO "RegistrationRequest";
CREATE UNIQUE INDEX "RegistrationRequest_email_key" ON "RegistrationRequest"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
