CREATE TABLE shampoos (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    tag TEXT NOT NULL
);

CREATE TYPE conditioner_type AS ENUM ('leave-in', 'conditioner');
CREATE TABLE conditioners (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    tag TEXT NOT NULL,
    type conditioner_type NOT NULL
);