#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import os
import mariadb
import connection.db_session

TABLE_STATEMENTS = [
    
    "DROP TABLE IF EXISTS `roles`",
    "DROP TABLE IF EXISTS `teams`",
    "DROP TABLE IF EXISTS `consultant`",
    "DROP TABLE IF EXISTS `client`",
    "DROP TABLE IF EXISTS `user`",
    
    """
    CREATE TABLE `user` (
        `user_id` INTEGER NOT NULL AUTO_INCREMENT,
        `first_name` VARCHAR(255) NOT NULL,
        `last_name` VARCHAR(255) NOT NULL,
        `work_experience` JSON NOT NULL,
        `project_experience` JSON NOT NULL,
        `skills` JSON NOT NULL,
        `years_experience` INTEGER NOT NULL,
        `industry` JSON NOT NULL,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        PRIMARY KEY (`user_id`),
        UNIQUE (`user_id`)
    ) ENGINE=InnoDB
    """,
    """
    CREATE TABLE `consultant` (
        `user_id` INTEGER NOT NULL UNIQUE,
        `consultant_id` INTEGER NOT NULL AUTO_INCREMENT,
        `category` JSON NOT NULL,
        `ask` INTEGER NOT NULL,
        `engagement type` VARCHAR(255) NOT NULL,
        `team_style` JSON NOT NULL,
        `client_style` JSON NOT NULL,
        PRIMARY KEY (`consultant_id`),
        UNIQUE (`consultant_id`)
    ) ENGINE=InnoDB
    """,
    """
    CREATE TABLE `client` (
        `user_id` INTEGER NOT NULL UNIQUE,
        `client_id` INTEGER NOT NULL AUTO_INCREMENT,
        `consultant_style` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`client_id`),
        UNIQUE (`client_id`)
    ) ENGINE=InnoDB
    """,
    """
    CREATE TABLE `teams` (
        `team_id` INTEGER NOT NULL AUTO_INCREMENT,
        `client_id` INTEGER NOT NULL,
        `category` VARCHAR(255) NOT NULL,
        `total_budget` INTEGER NOT NULL,
        `engagement_type` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`team_id`),
        UNIQUE (`team_id`)
    ) ENGINE=InnoDB
    """,
    """
    CREATE TABLE `roles` (
        `id` INTEGER NOT NULL AUTO_INCREMENT,
        `team_id` INTEGER NOT NULL,
        `consultant_id` INTEGER NULL,
        `industry` JSON NOT NULL,
        `category` VARCHAR(255) NOT NULL,
        `skills` JSON NOT NULL,
        `offer` INTEGER NOT NULL,
        `years_experience` INTEGER NOT NULL,
        `engagement_type` VARCHAR(255) NOT NULL,
        `expiry_date` DATETIME NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE (`id`),
        CONSTRAINT `fk_roles_team`
            FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`)
            ON UPDATE NO ACTION ON DELETE NO ACTION,
        CONSTRAINT `fk_roles_consultant`
            FOREIGN KEY (`consultant_id`) REFERENCES `consultant` (`consultant_id`)
            ON UPDATE NO ACTION ON DELETE NO ACTION
    ) ENGINE=InnoDB
    """,
    """
    ALTER TABLE `client`
    ADD CONSTRAINT `fk_client_user`
        FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
        ON UPDATE NO ACTION ON DELETE NO ACTION
    """,
    """
    ALTER TABLE `consultant`
    ADD CONSTRAINT `fk_consultant_user`
        FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
        ON UPDATE NO ACTION ON DELETE NO ACTION
    """,
    """
    ALTER TABLE `teams`
    ADD CONSTRAINT `fk_teams_client`
        FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`)
        ON UPDATE NO ACTION ON DELETE NO ACTION
    """,
]

TRIGGER_STATEMENTS=[
"""
CREATE TRIGGER roles_budget_before_insert
BEFORE INSERT ON roles
FOR EACH ROW
BEGIN
    DECLARE v_budget INT DEFAULT NULL;
    DECLARE v_used BIGINT DEFAULT 0;

    IF NEW.offer < 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Role offer cannot be negative';
    END IF;

    -- Lock this team's row so concurrent role inserts for the same team
    -- are checked one at a time.
    SELECT total_budget
      INTO v_budget
      FROM teams
     WHERE team_id = NEW.team_id
     FOR UPDATE;

    IF v_budget IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Team does not exist';
    END IF;

    SELECT COALESCE(SUM(offer), 0)
      INTO v_used
      FROM roles
     WHERE team_id = NEW.team_id;

    IF v_used + NEW.offer > v_budget THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Role offers exceed the team budget';
    END IF;
END
""",
"""
CREATE TRIGGER roles_budget_before_update
BEFORE UPDATE ON roles
FOR EACH ROW
BEGIN
    DECLARE v_budget INT DEFAULT NULL;
    DECLARE v_used BIGINT DEFAULT 0;

    IF NEW.offer < 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Role offer cannot be negative';
    END IF;

    SELECT total_budget
      INTO v_budget
      FROM teams
     WHERE team_id = NEW.team_id
     FOR UPDATE;

    IF v_budget IS NULL THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Team does not exist';
    END IF;

    -- Exclude the role being updated, then count its new offer.
    SELECT COALESCE(SUM(offer), 0)
      INTO v_used
      FROM roles
     WHERE team_id = NEW.team_id
       AND id <> OLD.id;

    IF v_used + NEW.offer > v_budget THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Role offers exceed the team budget';
    END IF;
END
""",
"""
CREATE TRIGGER teams_budget_before_update
BEFORE UPDATE ON teams
FOR EACH ROW
BEGIN
    DECLARE v_used BIGINT DEFAULT 0;

    IF NEW.total_budget < 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Team budget cannot be negative';
    END IF;

    SELECT COALESCE(SUM(offer), 0)
      INTO v_used
      FROM roles
     WHERE team_id = OLD.team_id;

    IF v_used > NEW.total_budget THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'New team budget is below existing role offers';
    END IF;
END
"""
]

def execute_sql(connection, statements):
    cursor = connection.cursor()
    try:
        for statement in statements:
            cursor.execute(statement)
        connection.commit()
    finally:
        cursor.close()

def main():

   connection = db_session() 

    try:
        execute_sql(connection, TABLE_STATEMENTS)
        print("Tables and foreign keys created successfully.")
        execute_sql(connection, TRIGGER_STATEMENTS)
        print("Created role and team budget trigger.")
    except mariadb.Error:
        connection.rollback()
        raise
    finally:
        connection.close()


if __name__ == "__main__":
    main()

