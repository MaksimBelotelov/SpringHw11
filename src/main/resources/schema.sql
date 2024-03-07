create table if not exists notes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(50),
    content VARCHAR(200),
    datecreated DATE
);