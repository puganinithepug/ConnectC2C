#!/usr/bin/env python
# coding: utf-8

# In[11]:


import json
import os
import random
import re
from datetime import datetime, timedelta
from pathlib import Path

import mariadb

from pyspark.sql import SparkSession
from pyspark.sql.types import (
    IntegerType,
    StringType,
    StructField,
    StructType,
    TimestampType,
)

DATA_DIR = Path.cwd()/"data"
# Path(__file__).resolve().parent / "data"
rand = random.Random(int(os.getenv("SEED", "42")))

# Configure these environment variables before running the script.
JDBC_URL = os.getenv("JDBC_URL", "jdbc:mariadb://localhost:3306/consultant_app")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD")

if not DB_PASSWORD:
    raise RuntimeError("Set DB_PASSWORD in your environment before running.")

spark = (
    SparkSession.builder
    .appName("PopulateConsultantApp")
    .getOrCreate()
)

# helper to grab random rows
def sample_rows(records, minimum, maximum, label):
    if len(records) < minimum:
        raise RuntimeError(
            f"{label} needs at least {minimum} rows; found {len(records)}."
        )
    count = rand.randint(minimum, min(maximum, len(records)))
    return rand.sample(records, count)


def read_csv_records(filename):
    """Read a CSV as dictionaries. Suitable for small seed-data CSV files."""
    path = DATA_DIR / filename
    if not path.exists():
        print(f"CSV not found; using fallbacks for {filename}")
        return []

    df = (
        spark.read
        .option("header", True)
        .option("inferSchema", False)
        .option("mode", "PERMISSIVE")
        .csv(str(path))
    )

    records = []
    for row in df.collect():
        record = {
            str(key): str(value).strip()
            for key, value in row.asDict().items()
            if value is not None and str(value).strip()
        }
        if record:
            print(record)
            records.append(record)

    print(f"Read {len(records)} rows from {filename}")
    return records

# from user table get 40 users to populate the user table such that:
            #`user_id` INTEGER NOT NULL AUTO_INCREMENT, this i guess will be filled in automatically by mariadb?
            # `first_name` VARCHAR(255) NOT NULL, this comes from "first_name" header column of the "people.csv" 
            # `last_name` VARCHAR(255) NOT NULL, this comes from "last_name" header column of the "people.csv" 
            # `work_experience` JSON NOT NULL, this is a JSON in the DB so take randomly between 3 and 6 rows from the "work_experience.csv" and add these rows to the JSON 
            # `project_experience` JSON NOT NULL, this is a JSON in the DB so take randomly between 3 and 6 rows from the "project_experience.csv" and add these rows to the JSON 
            # `skills` JSON NOT NULL, pick at random 5 to 1o different ones from "technical skills" header column of the "skills.csv"
            # `years_experience` INTEGER NOT NULL, this should be a randint generated randonly for a value between 1 and 20
            # `industry` JSON NOT NULL, this is a JSON in the DB so take randomly 2 to 5 items from the "industry" column of the "industry.csv"
            # `email` VARCHAR(255) NOT NULL UNIQUE, this comes from "email" of the "people.csv" 
            # PRIMARY KEY (`user_id`),
            # UNIQUE (`user_id`)
# out of the users there are 10 clients and 30 consultants unique 
# for consultant table
            # `user_id` INTEGER NOT NULL UNIQUE, this i guess should be automatically taken from the user table
            # `consultant_id` INTEGER NOT NULL AUTO_INCREMENT, this i guess will be filled in automatically by mariadb?
            # `category` JSON NOT NULL, pick at random one from the "category" "categories.csv"
            # `ask` INTEGER NOT NULL, this should be a randint generated in range between 50000 and 300000
            # `engagement type` VARCHAR(255) NOT NULL, one random value taken from the "types" column of the "engagement_types.csv"
            # `team_style` JSON NOT NULL, take randomly 3 to 7 from the "behavior" column of the "style_consultant.csv" 
            # `client_style` JSON NOT NULL, take randomly 3 to 7 from the "behavior" column of the "style_client.csv" 
            # PRIMARY KEY (`consultant_id`),
            # UNIQUE (`consultant_id`)
# for client table 
            # `user_id` INTEGER NOT NULL UNIQUE, this i guess should be automatically taken from the user table
            # `client_id` INTEGER NOT NULL AUTO_INCREMENT, this i guess will be filled in automatically by mariadb?
            # `consultant_style` VARCHAR(255) NOT NULL, take randomly 3 to 7 from the "behavior" column of the "style_client.csv" 
            # PRIMARY KEY (`client_id`),
            # UNIQUE (`client_id`)
# for teams table 
            # `team_id` INTEGER NOT NULL AUTO_INCREMENT,this i guess will be filled in automatically by mariadb?
            # `client_id` INTEGER NOT NULL, this i guess should autonatically be taken from the client table 
            # `total_budget` INTEGER NOT NULL, this should be a randint generated in range between 50000 and 300000
            # `engagement_type` VARCHAR(255) NOT NULL, this should be taken from the "types" column of the "engagement_types.csv"
            # PRIMARY KEY (`team_id`),
            # UNIQUE (`team_id`)
# for roles table
            # `id` INTEGER NOT NULL AUTO_INCREMENT, this i guess will be filled in automatically by mariadb?
            # `team_id` INTEGER NOT NULL, this i guess should autonatically be taken from the team table 
            # `consultant_id` INTEGER NULL, this i guess should autonatically be taken from the client table 
            # `industry` JSON NOT NULL, pick at random 2 to 4 from the "industry" "industry.csv"
            # `category` VARCHAR(255) NOT NULL, pick at random one from the "category" "categories.csv"
            # `skills` JSON NOT NULL, pick at random 5 to 1o different ones from "technical skills" header column of the "skills.csv"
            # `offer` INTEGER NOT NULL, should not exceed the budget for team, should be part of sum of total budget, a value between 50000 and 300000, role.offer <= team.total_budget
            # `years_experience` INTEGER NOT NULL, this should be a randint generated randonly for a value between 1 and 20
            # `engagement_type` VARCHAR(255) NOT NULL, one random value taken from the "types" column of the "engagement_types.csv"
            # `expiry_date` DATETIME NOT NULL, should be a random date generated that is in the future
            # PRIMARY KEY (`id`),
            # UNIQUE (`id`),


def build_users(
    people,
    work_records,
    project_records,
    skill_records,
    industry_records,
):
    # Keep only people with an email, and ensure the selected emails are unique.
    people_by_email = {}
    for person in people:
        email = person.get("email", "").strip()
        if email:
            people_by_email.setdefault(email, person)

    if len(people_by_email) < 40:
        raise RuntimeError(
            f"Need 40 people with unique emails; found {len(people_by_email)}."
        )

    selected_people = rand.sample(list(people_by_email.values()), 40)

    # Collect distinct skill values from the specified CSV column.
    skills = list(dict.fromkeys(
        row["technical skills"].strip()
        for row in skill_records
        if row.get("technical skills", "").strip()
    ))
    if len(skills) < 5:
        raise RuntimeError(
            f"Need at least 5 distinct technical skills; found {len(skills)}."
        )

    users = []
    for person in selected_people:
        for field in ("first_name", "last_name", "email"):
            if not person.get(field, "").strip():
                raise RuntimeError(f"Person row is missing {field!r}: {person}")

        users.append({
            "first_name": person["first_name"].strip(),
            "last_name": person["last_name"].strip(),
            "work_experience": sample_rows(
                work_records, 3, 6, "work_experience.csv"
            ),
            "project_experience": sample_rows(
                project_records, 3, 6, "project_experience.csv"
            ),
            "skills": rand.sample(skills, rand.randint(5, min(10, len(skills)))),
            "years_experience": rand.randint(1, 20),
            "industry": sample_rows(
                industry_records, 2, 5, "industry.csv"
            ),
            "email": person["email"].strip(),
        })

    return users


def insert_users(connection, users):
    sql = """
        INSERT INTO `user`
            (first_name, last_name, work_experience, project_experience,
             skills, years_experience, industry, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """

    user_ids = []
    cursor = connection.cursor()
    try:
        for user in users:
            cursor.execute(sql, (
                user["first_name"],
                user["last_name"],
                json.dumps(user["work_experience"]),
                json.dumps(user["project_experience"]),
                json.dumps(user["skills"]),
                user["years_experience"],
                json.dumps(user["industry"]),
                user["email"],
            ))
            user_ids.append(cursor.lastrowid)

        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        cursor.close()

    return user_ids

            # `user_id` INTEGER NOT NULL UNIQUE, this i guess should be automatically taken from the user table
            # `consultant_id` INTEGER NOT NULL AUTO_INCREMENT, this i guess will be filled in automatically by mariadb?
            # `category` JSON NOT NULL, pick at random one from the "category" "categories.csv"
            # `ask` INTEGER NOT NULL, this should be a randint generated in range between 50000 and 300000
            # `engagement type` VARCHAR(255) NOT NULL, one random value taken from the "types" column of the "engagement_types.csv"
            # `team_style` JSON NOT NULL, take randomly 3 to 7 from the "behavior" column of the "style_consultant.csv" 
            # `client_style` JSON NOT NULL, take randomly 3 to 7 from the "behavior" column of the "style_client.csv" 
            # PRIMARY KEY (`consultant_id`),
            # UNIQUE (`consultant_id`)

def build_consultants(
    category_records,
    ask,
    engagement_records,
    consultant_style_records,
    client_style_records,
):

    # to do rest

    # Collect distinct skill values from the specified CSV column.
    skills = list(dict.fromkeys(
        row["technical skills"].strip()
        for row in skill_records
        if row.get("technical skills", "").strip()
    ))
    if len(skills) < 5:
        raise RuntimeError(
            f"Need at least 5 distinct technical skills; found {len(skills)}."
        )

    users = []
    for person in selected_people:
        for field in ("first_name", "last_name", "email"):
            if not person.get(field, "").strip():
                raise RuntimeError(f"Person row is missing {field!r}: {person}")

        users.append({
            "first_name": person["first_name"].strip(),
            "last_name": person["last_name"].strip(),
            "work_experience": sample_rows(
                work_records, 3, 6, "work_experience.csv"
            ),
            "project_experience": sample_rows(
                project_records, 3, 6, "project_experience.csv"
            ),
            "skills": rand.sample(skills, rand.randint(5, min(10, len(skills)))),
            "years_experience": rand.randint(1, 20),
            "industry": sample_rows(
                industry_records, 2, 5, "industry.csv"
            ),
            "email": person["email"].strip(),
        })

    return consultants


def insert_consultants(connection, consultants):

    # to do rest
    sql = """
        INSERT INTO `consultant`
            (first_name, last_name, work_experience, project_experience,
             skills, years_experience, industry, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """

    con_ids = []
    cursor = connection.cursor()
    try:
        for con in consultants:
            cursor.execute(sql, (
                con["first_name"],
                con["last_name"],
                json.dumps(con["work_experience"]),
                json.dumps(con["project_experience"]),
                json.dumps(con["skills"]),
                con["years_experience"],
                json.dumps(con["industry"]),
                con["email"],
            ))
            con_ids.append(cursor.lastrowid)

        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        cursor.close()

    return con_ids

def main():

    # read csvs into dictionaries

    people = read_csv_records("people.csv")
    work_records = read_csv_records("work_experience.csv")
    project_records = read_csv_records("project_experience.csv")
    skill_records = read_csv_records("skills.csv")
    industry_records = read_csv_records("industry.csv")
    category_records = read_csv_records("categories.csv")
    engagement_records = read_csv_records("engagement_types.csv")
    consultant_style_records = read_csv_records("style_consultant.csv")
    client_style_records = read_csv_records("style_client.csv")

    if not people:
        raise RuntimeError("people.csv has no usable rows; at least one person is required.")

    users = build_users(
    people,
    work_records,
    project_records,
    skill_records,
    industry_records,)

    user_ids = insert_users(connection, users)
    print(f"Inserted {len(user_ids)} users.")

    # do for all other tables like for users table


if __name__ == "__main__":
    main()











# In[ ]:





# In[ ]:




