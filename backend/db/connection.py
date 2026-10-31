import os
from contextlib import contextmanager

import mariadb


@contextmanager
def db_session():
    conn = mariadb.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")),
        user=os.getenv("DB_USER", "app_user"),
        password=os.environ["DB_PASSWORD"],
        database=os.getenv("DB_NAME", "consultant_app"),
    )

    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

