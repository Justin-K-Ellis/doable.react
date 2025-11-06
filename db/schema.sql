-- For reference

-- Version 1
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(250) NOT NULL,
    done BOOLEAN DEFAULT false,
    description TEXT
);
