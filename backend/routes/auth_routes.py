from flask import Blueprint, request, jsonify, session
from utils.csv_handler import CSVHandler
from utils.auth import AuthUtil
from config import Config
import json

auth_bp = Blueprint('auth', __name__)
csv_handler = CSVHandler(Config.CSV_DATA_PATH)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login route."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400
    
    user = csv_handler.get_user_by_email(email)
    
    if not user or not AuthUtil.verify_password(password, user['password_hash']):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Create session
    session['user_id'] = user['id']
    session['email'] = user['email']
    session['mode'] = user['mode']
    session.permanent = True
    
    return jsonify({
        'user_id': user['id'],
        'email': user['email'],
        'mode': user['mode']
    }), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400
    
    if csv_handler.get_user_by_email(email):
        return jsonify({'error': 'Email already exists'}), 409
    
    # Create user
    user_id = f"user_{AuthUtil.generate_session_token()[:8]}"
    now = AuthUtil.get_timestamp()
    
    new_user = {
        'id': user_id,
        'email': email,
        'password_hash': AuthUtil.hash_password(password),
        'mode': 'consultant',  # Default mode
        'profile_json': json.dumps({}),
        'behavioral_prefs_json': json.dumps({}),
        'search_history_json': json.dumps({'searches': []}),
        'posts_json': json.dumps([]),
        'messages_json': json.dumps([]),
        'created_at': str(now),
        'last_activity': str(now)
    }
    
    csv_handler.create_user(new_user)
    
    # Create session
    session['user_id'] = user_id
    session['email'] = email
    session['mode'] = 'consultant'
    session.permanent = True
    
    return jsonify({
        'user_id': user_id,
        'email': email,
        'mode': 'consultant'
    }), 201

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Logout route."""
    session.clear()
    return jsonify({'message': 'Logged out'}), 200

@auth_bp.route('/session', methods=['GET'])
def get_session():
    """Check current session status."""
    if 'user_id' not in session:
        return jsonify({'authenticated': False}), 401
    
    return jsonify({
        'authenticated': True,
        'user_id': session['user_id'],
        'email': session['email'],
        'mode': session['mode']
    }), 200

