-- Sets up MySQL server for the project database

CREATE USER IF NOT EXISTS 'readerverse_user'@'localhost' IDENTIFIED BY 'readerverse_user_PWD123!';
GRANT ALL PRIVILEGES ON readerverse_db.* TO 'readerverse_user'@'localhost';
FLUSH PRIVILEGES;