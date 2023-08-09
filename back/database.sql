create TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    date date,
    lastLogin date,
    status VARCHAR(255)
);