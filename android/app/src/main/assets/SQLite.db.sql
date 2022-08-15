BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "user" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT,
	"imagePath"	TEXT,
	"active"	INTEGER DEFAULT 1,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "account" (
	"id"	INTEGER NOT NULL UNIQUE,
	"updatedDebt"	INTEGER DEFAULT 0,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "movement" (
	"id"	Integer NOT NULL,
	"payingUserId"	Integer NOT NULL,
	"debtUserId"	Integer,
	"amount"	Integer NOT NULL,
	"date"	Text NOT NULL,
	"accountId"	Integer,
	"active"	Integer NOT NULL DEFAULT 1,
	CONSTRAINT "lnk_account_movement" FOREIGN KEY("accountId") REFERENCES "account"("id"),
	CONSTRAINT "movement_user_NO ACTION_NO ACTION_debtUserId_id_0" FOREIGN KEY("debtUserId") REFERENCES "user"("id"),
	CONSTRAINT "movement_user_NO ACTION_NO ACTION_payingUserId_id_0" FOREIGN KEY("payingUserId") REFERENCES "user"("id"),
	CONSTRAINT "unique_id" UNIQUE("id")
);
CREATE TABLE IF NOT EXISTS "user_account" (
	"id"	INTEGER NOT NULL UNIQUE,
	"userId"	INTEGER NOT NULL,
	"accountId"	INTEGER NOT NULL,
	CONSTRAINT "lnk_account_user_account" FOREIGN KEY("accountId") REFERENCES "account"("id"),
	CONSTRAINT "lnk_user_user_account" FOREIGN KEY("userId") REFERENCES "user"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "user" VALUES (1,'Álvaro','https://cucla.s3.amazonaws.com/static/images/2020-11-12-130459_circle.jpg',1);
INSERT INTO "user" VALUES (2,'Erwin','https://randomuser.me/api/portraits/men/88.jpg',1);
INSERT INTO "user" VALUES (3,'Carolina','https://randomuser.me/api/portraits/women/37.jpg',1);
INSERT INTO "account" VALUES (1,0);
INSERT INTO "account" VALUES (2,0);
INSERT INTO "user_account" VALUES (1,1,1);
INSERT INTO "user_account" VALUES (2,2,1);
INSERT INTO "user_account" VALUES (3,1,2);
INSERT INTO "user_account" VALUES (5,3,2);
CREATE TRIGGER "update_account_updatedDebt_after_insert_movement"
	AFTER INSERT
	ON "movement"
	FOR EACH ROW
BEGIN
UPDATE account SET updatedDebt = (
	SELECT SUM(m.amount) - LAG(SUM(m.amount), 1,0) OVER (ORDER BY SUM(m.amount)) debt
	FROM user u JOIN movement m ON u.id = m.payingUserId
	WHERE m.accountId =  NEW.accountId AND m.active = 1 GROUP BY u.id ORDER BY SUM(m.amount) DESC, debt ASC LIMIT 1) WHERE id = NEW.accountId; END;
CREATE TRIGGER "update_account_updatedDebt_after_update_movement"
	AFTER UPDATE
	ON "movement"
	FOR EACH ROW
BEGIN 

UPDATE account SET updatedDebt = ( 

SELECT SUM(m.amount) - LAG(SUM(m.amount), 1,0) OVER (ORDER BY SUM(m.amount)) debt 
FROM user u JOIN movement m ON u.id = m.payingUserId 
WHERE m.accountId =  NEW.accountId AND m.active = 1 GROUP BY u.id ORDER BY SUM(m.amount) DESC, debt ASC LIMIT 1) WHERE id = NEW.accountId; END;
COMMIT;
