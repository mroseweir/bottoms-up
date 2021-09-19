CREATE DATABASE bottomsup;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE favorites(
    userid INT NOT NULL,
    drinkid INT NOT NULL
);

CREATE TABLE comments(
    userid INT NOT NULL,
    drinkid INT NOT NULL,
    comment VARCHAR(5000)
);

INSERT INTO comments (userid, drinkid, comment) VALUES (31, 11054, 'This is test');
INSERT INTO comments (userid, drinkid, comment) VALUES (31, 13899, 'This is test');
INSERT INTO comments (userid, drinkid, comment) VALUES (31, 13899, 'This is also a test');
INSERT INTO comments (userid, drinkid, comment) VALUES (31, 13086, 'This is test');
SELECT comment FROM comments WHERE userid = 31 AND drinkid = 11054;

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("userid") REFERENCES "users"("id");

ALTER TABLE "ratings" ADD CONSTRAINT "ratings_fk0" FOREIGN KEY ("userid") REFERENCES "users"("id");
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_fk1" FOREIGN KEY ("drinkid") REFERENCES "favorites"("drinkid");

INSERT INTO users (name, username, password) VALUES ('Michael', 'mroseweir', 'test');


DELETE FROM favorites WHERE userid = 30 AND drinkid = 12766 RETURNING *;
