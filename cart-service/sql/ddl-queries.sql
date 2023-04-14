
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
   updated_at date not null,
   status status_enum
);

-- Cart_Item
DROP TABLE if exists cart_items;
create table if not exists cart_items (
   cart_id uuid,
   foreign key ("cart_id") references "carts" ("id"),
   product_id uuid,
   count integer not null default 1
);


DROP TABLE if exists products;
create table if not exists products (
   id uuid,
   title text not null,
   description text not null,
   price integer not null
   );


-- Orders table creation
DROP TABLE if exists orders;
create table if not exists orders (
   id uuid primary key default uuid_generate_v4(),
   user_id uuid,
   foreign key ("user_id") references "users" ("id"),
   cart_id uuid,
   foreign key ("cart_id") references "carts" ("id"),
   payment jsonb,
   delivery jsonb,
   comments text,
   status status_enum default 'OPEN',
   total integer not null
   );





