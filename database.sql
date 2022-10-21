CREATE DATABASE IF NOT EXISTS ZARAO;
USE ZARAO;
CREATE TABLE IF NOT EXISTS users(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenoms VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    tel VARCHAR(19) NOT NULL,
    facebook TEXT,
    `password` TEXT,
    photo_path VARCHAR(255),
    created_at DATETIME DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS associations(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_association VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    tel VARCHAR(19) NOT NULL,
    facebook TEXT,
    `password` TEXT,
    photo_path VARCHAR(255),
    created_at DATETIME DEFAULT NOW(),
    `user_id` INT(11) NOT NULL,
    CONSTRAINT fk_associations_user_id 
        FOREIGN KEY(`user_id`) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS categories(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_categorie VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    `user_id` INT(11) NOT NULL,
    CONSTRAINT fk_categories_user_id 
        FOREIGN KEY(`user_id`) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS type_articles(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    `user_id` INT(11) NOT NULL,
    CONSTRAINT fk_type_articles_user_id 
        FOREIGN KEY(`user_id`) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS articles(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_article VARCHAR(255) NOT NULL,
    nombres INT(11) NOT NULL,
    `description` TEXT,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NULL,
    `user_id` INT(11),
    association_id INT(11),
    categorie_id INT(11) NOT NULL,
    type_article_id INT(11) NOT NULL,
    path_image VARCHAR(255),
    CONSTRAINT fk_articles_user_id 
        FOREIGN KEY(`user_id`) REFERENCES users(id),
    CONSTRAINT fk_articles_association_id 
        FOREIGN KEY(association_id) REFERENCES associations(id),
    CONSTRAINT fk_articles_categorie_id
        FOREIGN KEY(categorie_id) REFERENCES categories(id),
    CONSTRAINT fk_articles_type_article_id
        FOREIGN KEY(type_article_id) REFERENCES type_articles(id)
);

CREATE TABLE IF NOT EXISTS type_messages(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS messages(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `message` TEXT NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    type_message_id INT(11) NOT NULL,
    `user_id` INT(11) NOT NULL,
    dest_id INT(11) NOT NULL,
    path_file VARCHAR(255),
    CONSTRAINT fk_messages_type_message_id
        FOREIGN KEY(type_message_id) REFERENCES type_messages(id),
    CONSTRAINT fk_messages_user_id 
        FOREIGN KEY(`user_id`) REFERENCES users(id),
    CONSTRAINT fk_messages_dest_id 
        FOREIGN KEY(`user_id`) REFERENCES users(id)
);
