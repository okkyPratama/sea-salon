CREATE TABLE review(
	id SERIAL PRIMARY KEY,
	customer_name VARCHAR(100) NOT NULL,
	rating INTEGER NOT NULL,
	comment VARCHAR(255) NOT NULL
);

INSERT INTO review (customer_name,rating,comment)
VALUES
	('Cassandra',5,'Salonnnya bagus'), 
	('Joanna',3,'b aja inimah'),
	('Michelle',1,'Hasilnya kurang memuaskan');

CREATE TABLE users(
	user_id serial primary key,
	fullname varchar(100) not null,
	email varchar(100) not null,
	phone_number varchar(100) not null,
	password  varchar(255) not null,
	role varchar(25) not null
);

CREATE EXTENSION pgcrypto ;
insert into users(fullname,email,phone_number,password,role)
values ('Thomas N','thomas.n@compfest.id',' 08123456789',crypt('Admin123',gen_salt('bf')),'Admin');

CREATE TABLE services(
	id serial primary key,
	name varchar(50) not null,
	duration_per_session time not null
);
insert into services(name,duration_per_session)
values('Haircuts and styling','01:00:00'),
	('Manicure and pedicure','01:00:00'),  
	('Facial treatment','01:00:00');

CREATE TABLE branch(
	id serial primary key,
	branch_name varchar(100) not null,
	branch_location varchar(100) not null,
	opening_time time not null,
	closing_time time not null
);
CREATE TABLE reservations(
	id SERIAL PRIMARY KEY,
	user_id integer not null,
	name VARCHAR(100) NOT NULL,
	phone_number VARCHAR(20) NOT NULL,
	service VARCHAR(50) NOT NULL,
	date_time TIMESTAMP NOT NULL,
	constraint user_id foreign key(user_id) references users(user_id)
);
