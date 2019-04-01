
CREATE TABLE users(
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   user_name varchar(255) not null,
   secret varchar(255) not null
) ENGINE=InnoDB;

CREATE TABLE conversations(
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   topic varchar(255) NOT NULL,
   started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE points(
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   convo_id int NOT NULL,
   point_title varchar(255) NOT NULL,
   CONSTRAINT points_fk_1 
   FOREIGN KEY (convo_id) 
   REFERENCES conversations (id) 
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
   supporter int NOT NULL,
   support_type int NOT NULL,
   
   PRIMARY KEY(from_id, to_id),
   
   CONSTRAINT attack_support_fk_1 
   FOREIGN KEY (from_id, to_id) 
   REFERENCES message_attacks (from_id, to_id)
   ON DELETE CASCADE,

   CONSTRAINT attack_support_fk_2 
   FOREIGN KEY (supporter) 
   REFERENCES users (id) 
   
) ENGINE=InnoDB;