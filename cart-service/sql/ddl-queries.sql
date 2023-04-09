
-- User
DROP TABLE if exists users
create table if not exists users (
   id uuid primary key default uuid_generate_v4(),
   name text not null,           -- user's name
   password text not null		  -- user's password
);

-- Carts
create type status_enum as enum ('OPEN', 'ORDERED')

DROP TABLE if exists carts
create table if not exists carts (
   id uuid primary key default uuid_generate_v4(),
   user_id uuid default uuid_generate_v4(),
   created_at date not null,
   status status_enum
);

-- Cart_Item
DROP TABLE if exists cart_items
create table if not exists cart_items (
   cart_id uuid,
   foreign key ("cart_id") references "carts" ("id"),
   product_id uuid,
   count integer not null default 1
);





