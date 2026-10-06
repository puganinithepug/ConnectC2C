from flask import Blueprint, request, jsonify, session
from middleware.auth_middleware import require_auth
from utils.csv_handler import CSVHandler
from utils.auth import AuthUtil
from config import Config
import json

user_bp = Blueprint('users', __name__)
csv_handler = CSVHandler(Config.CSV_DATA_PATH)

@user_bp.route('/<user_id>', methods=['GET'])
@require_auth
def get_user(user_id):
    """Get user profile (public view - no password/messages)."""
    user = csv_handler.get_user_by_id(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'id': user['id'],
        'email': user['email'],
        'mode': user['mode'],
        'profile': user['profile'],
        'behavioral_prefs': user['behavioral_prefs'],
        'created_at': user['created_at']
    }), 200

@user_bp.route('/me', methods=['GET'])
@require_auth
def get_current_user():
    """Get current logged-in user's full profile."""
    user_id = session.get('user_id')
    user = csv_handler.get_user_by_id(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'id': user['id'],
        'email': user['email'],
        'mode': user['mode'],
        'profile': user['profile'],
        'behavioral_prefs': user['behavioral_prefs'],
        'search_history': user['search_history'],
        'created_at': user['created_at'],
        'last_activity': user['last_activity']
    }), 200

@user_bp.route('/me/mode', methods=['PUT'])
@require_auth
def update_mode():
    """Update user mode (consultant -> client or vice versa)."""
    user_id = session.get('user_id')
    data = request.get_json()
    new_mode = data.get('mode')
    
    if new_mode not in ['consultant', 'client']:
        return jsonify({'error': 'Invalid mode'}), 400
    
    user = csv_handler.update_user(user_id, {'mode': new_mode})
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    session['mode'] = new_mode
    
    return jsonify({'mode': new_mode}), 200

@user_bp.route('/me/profile', methods=['PUT'])
@require_auth
def update_profile():
    """Update user profile (resume data)."""
    user_id = session.get('user_id')
    data = request.get_json()
    
    # Validate profile data
    profile_update = {
        'name': data.get('name', ''),
        'contact': data.get('contact', {}),
        'workplace_history': data.get('workplace_history', []),
        'project_history': data.get('project_history', []),
        'github_link': data.get('github_link', '')
    }
    
    user = csv_handler.get_user_by_id(user_id)
    current_profile = user['profile']
    current_profile.update(profile_update)
    
    updated_user = csv_handler.update_user(user_id, {'profile': current_profile})
    
    return jsonify({'profile': updated_user['profile']}), 200

@user_bp.route('/me/industries', methods=['PUT'])
@require_auth
def update_industries():
    """Update user industries (specialties/hiring targets)."""
    user_id = session.get('user_id')
    data = request.get_json()
    industries = data.get('industries', [])
    
    if not isinstance(industries, list):
        return jsonify({'error': 'Industries must be a list'}), 400
    
    user = csv_handler.get_user_by_id(user_id)
    current_profile = user['profile']
    current_profile['industries'] = industries
    
    updated_user = csv_handler.update_user(user_id, {'profile': current_profile})
    
    return jsonify({'industries': updated_user['profile'].get('industries', [])}), 200

@user_bp.route('/me/behavioral-prefs', methods=['PUT'])
@require_auth
def update_behavioral_prefs():
    """Update behavioral preferences (work environment, salary, etc.)."""
    user_id = session.get('user_id')
    data = request.get_json()
    user = csv_handler.get_user_by_id(user_id)
    mode = user['mode']
    
    if mode == 'consultant':
        # Consultant preferences
        prefs_update = {
            'work_env': data.get('work_env'),  # remote, hybrid, in-person
            'salary_goal': data.get('salary_goal'),
            'experience_years': data.get('experience_years'),
            'pace': data.get('pace'),  # fast-paced, corporate, entrepreneurial, chaotic
            'job_type': data.get('job_type')  # project, temporary, permanent
        }
    else:  # client
        # Client preferences
        prefs_update = {
            'ideal_candidate_experience': data.get('ideal_candidate_experience'),
            'ideal_candidate_style': data.get('ideal_candidate_style'),
            'collaboration_style': data.get('collaboration_style'),  # high, low interaction
            'reporting_preference': data.get('reporting_preference'),
            'budget_type': data.get('budget_type'),  # one-time, rate
            'offered_atmosphere': data.get('offered_atmosphere')
        }
    
    current_prefs = user['behavioral_prefs']
    current_prefs.update(prefs_update)
    
    updated_user = csv_handler.update_user(user_id, {'behavioral_prefs': current_prefs})
    
    return jsonify({'behavioral_prefs': updated_user['behavioral_prefs']}), 200

@user_bp.route('/search', methods=['GET'])
@require_auth
def search_users():
    """Search for users by name, email, or industry."""
    query = request.args.get('q', '').lower()
    mode_filter = request.args.get('mode')  # Filter by consultant/client
    
    if not query or len(query) < 2:
        return jsonify({'error': 'Query too short'}), 400
    
    all_users = csv_handler.get_all_users()
    results = []
    
    for user in all_users:
        # Skip current user
        if user['id'] == session.get('user_id'):
            continue
        
        # Apply mode filter
        if mode_filter and user['mode'] != mode_filter:
            continue
        
        # Search in name, email, industries
        name = user['profile'].get('name', '').lower()
        email = user['email'].lower()
        industries = [ind.lower() for ind in user['profile'].get('industries', [])]
        
        if query in name or query in email or any(query in ind for ind in industries):
            results.append({
                'id': user['id'],
                'email': user['email'],
                'mode': user['mode'],
                'name': user['profile'].get('name'),
                'industries': user['profile'].get('industries', [])
            })
    
    return jsonify({'results': results}), 200

