CREATE TABLE cartitems (
                           id BIGSERIAL PRIMARY KEY,

                           itemname VARCHAR(255) NOT NULL,
                           pricesnapshot NUMERIC(19,2) NOT NULL,
                           itemtype VARCHAR(100) NOT NULL,

                           cart_id BIGINT NOT NULL,

                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key constraint
ALTER TABLE cartitems
    ADD CONSTRAINT fk_cartitems_cart
        FOREIGN KEY (cart_id)
            REFERENCES tripcarts(id)
            ON DELETE CASCADE;