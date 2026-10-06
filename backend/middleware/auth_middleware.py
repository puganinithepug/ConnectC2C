from flask import session, request, jsonify
from functools import wraps
from utils.session_manager import SessionManager

def session_timeout_middleware():
    """Check for session timeout on every request."""
    # Skip for public routes
    public_routes = ['/api/auth/login', '/api/auth/register']
    
    if request.path in public_routes:
        return
    
    if SessionManager.is_session_expired():
        return jsonify({'error': 'Session expired'}), 401
    
    SessionManager.refresh_session()

def require_auth(f):
    """Decorator to require authentication for a route."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized'}), 401
        
        if SessionManager.is_session_expired():
            return jsonify({'error': 'Session expired'}), 401
        
        SessionManager.refresh_session()
        return f(*args, **kwargs)
    
    return decorated_function

