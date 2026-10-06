import os
from datetime import timedelta

class Config:
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-prod'
    DEBUG = os.environ.get('FLASK_ENV') == 'development'
    
    # Session
    SESSION_COOKIE_SECURE = False  # True in production with HTTPS
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=10)
    SESSION_REFRESH_EACH_REQUEST = True
    
    # CSV storage
    CSV_DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'users.csv')
    
    # App constraints (from prior conversation)
    POST_MAX_LENGTH = 200
    POST_MAX_REPLIES = 5
    MESSAGE_EXPIRY_HOURS = 24
    FIRST_MESSAGE_EXPIRY_HOURS = 48
    SEARCH_HISTORY_DAYS = 30
    SESSION_TIMEOUT_MINUTES = 10

