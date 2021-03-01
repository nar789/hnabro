
create table payment_history(id int primary key auto_increment,
 user_id int,
 payment_id int,
 price int,
 paid_date datetime);



create table payment(id int primary key auto_increment,
 user_id int,
 date_to_pay date,
 card_info text);


create table week(id int primary key auto_increment,
 user_id int,
 address varchar(255),
 wanted_date date,
 confirmed_perfume text,
 confirm_state boolean,
 confirmed_date datetime);
 


create table preference(id int primary key auto_increment,
 user_id int,
 slot text,
 slot_note text);



create table comment(id int primary key auto_increment,
 user_id int,
 perfume_id int, 
 comment varchar(255));



create table recommand(id int primary key auto_increment,
 user_id int,
 perfume_id int,
 type int,
 perfume_list text);
 
  

create table perfume(id int primary key auto_increment,
 name varchar(255),
 avatar varchar(255),
 notes text,
 hot_banner varchar(255),
 banner varchar(255),
 story text,
 hashtags text,
 likes int,
 subscribes int);
 


create table user(id int primary key auto_increment,
 address varchar(255),
 name varchar(255),
 sex int,
 age int,
 hashtags text,
 personality varchar(255),
 job varchar(255),
 oauth_type int,
 likes text,
 subscribe_type int);