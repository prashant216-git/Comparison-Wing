CREATE TABLE tripcarts (
                           id BIGSERIAL PRIMARY KEY,

                           cartname VARCHAR(255) NOT NULL,

                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);