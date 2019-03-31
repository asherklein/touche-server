
CREATE TABLE user (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_name varchar(355) NOT NULL,
  pass_hash varchar(355) NOT NULL,
  prd_price decimal(10,0) DEFAULT NULL,
  cat_id int(11) NOT NULL,
  vdr_id int(11) NOT NULL,
  PRIMARY KEY (prd_id),
  KEY fk_cat (cat_id),
  KEY fk_vendor(vdr_id),
 
  CONSTRAINT products_ibfk_2 
  FOREIGN KEY (vdr_id) 
  REFERENCES vendors (vdr_id) 
  ON DELETE NO ACTION 
  ON UPDATE CASCADE,
 
  CONSTRAINT products_ibfk_1 
  FOREIGN KEY (cat_id) 
  REFERENCES categories (cat_id) 
  ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE users(
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   user_name varchar(255) not null,
   secret varchar(255) not null
) ENGINE=InnoDB;

CREATE TABLE topics(
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   topic_title varchar(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE points(
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   topic_id int NOT NULL,
   point_title varchar(255) NOT NULL,
   CONSTRAINT points_fk_1 
   FOREIGN KEY (topic_id) 
   REFERENCES topics (id) 
   ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE messages(
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   sent_by int NOT NULL,
   sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   content text,
   CONSTRAINT messages_fk_1
   FOREIGN KEY (sent_by) 
   REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE message_on_point(
   point_id int NOT NULL,
   message_id int NOT NULL,
   PRIMARY KEY(point_id, message_id),
   CONSTRAINT message_on_point_fk_1 
   FOREIGN KEY (point_id) 
   REFERENCES points (id) 
   ON DELETE CASCADE,
   CONSTRAINT message_on_point_fk_2 
   FOREIGN KEY (message_id) 
   REFERENCES messages (id) 
   ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE message_attacks(
   from_id int NOT NULL,
   to_id int NOT NULL,
   PRIMARY KEY(from_id, to_id),
   CONSTRAINT message_attacks_fk_1 
   FOREIGN KEY (from_id) 
   REFERENCES messages (id) 
   ON DELETE CASCADE,
   CONSTRAINT message_attacks_fk_2 
   FOREIGN KEY (to_id) 
   REFERENCES messages (id) 
   ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE attack_support(
   from_id int NOT NULL,
   to_id int NOT NULL,
   support_type int NOT NULL,
   PRIMARY KEY(from_id, to_id),
   CONSTRAINT attack_support_fk_1 
   FOREIGN KEY (from_id, to_id) 
   REFERENCES message_attacks (from_id, to_id) 
   ON DELETE CASCADE
) ENGINE=InnoDB;