-- CREATE TABLE services(
--    id SERIAL PRIMARY KEY,
--    name VARCHAR(100),
--    price DECIMAL,
--    duration TIME,
--    specialization VARCHAR(100)
-- );

-- CREATE TABLE orders(
--    id SERIAL PRIMARY KEY,
--    master_id INTEGER,
--    user_id INTEGER,
--    description VARCHAR(512),
--    start_date VARCHAR(100),
--    end_date VARCHAR(100),
--    status VARCHAR(100),
--    status_color VARCHAR(100),
--    commentary VARCHAR(512),
--    photo VARCHAR(521),
--    service_id INTEGER,
--    FOREIGN KEY (master_id) REFERENCES masters (id),
--    FOREIGN KEY (service_id) REFERENCES services (id)
-- );

-- CREATE TABLE schedule(
--    id SERIAL PRIMARY KEY,
--    master_id INTEGER,
--    working_hours VARCHAR(100),
--    status VARCHAR(100),
--    FOREIGN KEY (master_id)  REFERENCES masters (id)
-- );

-- CREATE TABLE specializations(
--    id SERIAL PRIMARY KEY,
--    name VARCHAR(100),
--    icon VARCHAR(512)
-- );

-- CREATE TABLE masters(
--    id SERIAL PRIMARY KEY,
--    user_id INTEGER,
--    location_id INTEGER,
--    specialization_id INTEGER,
--    FOREIGN KEY (user_id) REFERENCES users (id),
--    FOREIGN KEY (location_id) REFERENCES locations (id),
--    FOREIGN KEY (specialization_id) REFERENCES specializations (id)
-- );

-- CREATE TABLE location_types(
--    id SERIAL PRIMARY KEY,
--    name VARCHAR(100)
-- );

-- CREATE TABLE locations(
--    id SERIAL PRIMARY KEY,
--    parent_id INTEGER,
--    name VARCHAR(100),
--    coordinates DECIMAL,
--    type_id INTEGER,
--    FOREIGN KEY (type_id) REFERENCES location_types (id)
-- );

-- CREATE TABLE roles(
--    id SERIAL PRIMARY KEY,
--    name VARCHAR(100),
--    rights VARCHAR(100)
-- );

-- CREATE TABLE users(
--    id SERIAL PRIMARY KEY,
--    login VARCHAR(100),
--    password VARCHAR(512),
--    role_id INTEGER,
--    lastname VARCHAR(100),
--    firstname VARCHAR(100),
--    middlename VARCHAR(100),
--    FOREIGN KEY (role_id) REFERENCES roles (id)
-- );