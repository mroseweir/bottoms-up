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

CREATE TABLE ratings(
    userid INT NOT NULL,
    drinkid INT NOT NULL,
    rating INT,
    comment VARCHAR(5000)
);

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("userid") REFERENCES "users"("id");

ALTER TABLE "ratings" ADD CONSTRAINT "ratings_fk0" FOREIGN KEY ("userid") REFERENCES "users"("id");
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_fk1" FOREIGN KEY ("drinkid") REFERENCES "favorites"("drinkid");

INSERT INTO users (name, username, password) VALUES ('Michael', 'mroseweir', 'test');


DELETE FROM favorites WHERE userid = 30 AND drinkid = 12766 RETURNING *;

ALTER TABLE users 
RENAME COLUMN id TO user_id;