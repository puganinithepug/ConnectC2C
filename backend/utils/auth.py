import bcrypt
import secrets
from datetime import datetime, timedelta

class AuthUtil:
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash a password using bcrypt."""
        salt = bcrypt.gensalt(rounds=12)
        return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    @staticmethod
    def verify_password(password: str, password_hash: str) -> bool:
        """Verify a password against its hash."""
        return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
    
    @staticmethod
    def generate_session_token() -> str:
        """Generate a random session token."""
        return secrets.token_urlsafe(32)
    
    @staticmethod
    def get_timestamp() -> int:
        """Get current Unix timestamp."""
        return int(datetime.now().timestamp())

