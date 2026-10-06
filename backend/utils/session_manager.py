from datetime import datetime, timedelta
from flask import session, request

class SessionManager:
    SESSION_TIMEOUT_MINUTES = 10
    
    @staticmethod
    def is_session_expired() -> bool:
        """Check if session has timed out due to inactivity."""
        if 'user_id' not in session:
            return True
        
        last_activity = session.get('last_activity')
        if not last_activity:
            return True
        
        last_activity_time = datetime.fromisoformat(last_activity)
        timeout = timedelta(minutes=SessionManager.SESSION_TIMEOUT_MINUTES)
        
        return datetime.now() > (last_activity_time + timeout)
    
    @staticmethod
    def refresh_session():
        """Update last activity timestamp."""
        session['last_activity'] = datetime.now().isoformat()
        session.permanent = True

