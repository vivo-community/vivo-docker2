CREATE DATABASE vitrodb CHARACTER SET utf8;
GRANT ALL PRIVILEGES ON vitrodb.* TO 'vitrodbUsername'@'%' IDENTIFIED BY 'vitrodbPassword';
GRANT ALL PRIVILEGES ON vitrodb.* TO 'vitrodbUsername'@'localhost' IDENTIFIED BY 'vitrodbPassword';
FLUSH PRIVILEGES;


