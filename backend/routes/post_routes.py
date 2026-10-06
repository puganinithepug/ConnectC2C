from flask import Blueprint, request, jsonify, session
from middleware.auth_middleware import require_auth
from utils.csv_handler import CSVHandler
from utils.auth import AuthUtil
from config import Config
import json
import uuid

post_bp = Blueprint('posts', __name__)
csv_handler = CSVHandler(Config.CSV_DATA_PATH)

@post_bp.route('', methods=['POST'])
@require_auth
def create_post():
    """Create a new post (text-only, max 200 chars)."""
    user_id = session.get('user_id')
    data = request.get_json()
    title = data.get('title', '').strip()
    content = data.get('content', '').strip()
    
    if len(title) == 0 or len(title) > 200:
        return jsonify({'error': f'Title must be 1-{Config.POST_MAX_LENGTH} characters'}), 400
    
    if len(content) > Config.POST_MAX_LENGTH:
        return jsonify({'error': f'Content must be max {Config.POST_MAX_LENGTH} characters'}), 400
    
    # Check for links or mentions
    if 'http' in content or '@' in content:
        return jsonify({'error': 'No links or mentions allowed'}), 400
    
    post_id = str(uuid.uuid4())
    now = AuthUtil.get_timestamp()
    
    new_post = {
        'id': post_id,
        'author_id': user_id,
        'title': title,
        'content': content,
        'created_at': now,
        'replies': []
    }
    
    user = csv_handler.get_user_by_id(user_id)
    user['posts'].append(new_post)
    csv_handler.update_user(user_id, {'posts': user['posts']})
    
    return jsonify(new_post), 201

@post_bp.route('', methods=['GET'])
@require_auth
def list_posts():
    """List all posts (paginated, with optional search)."""
    search_query = request.args.get('search', '').lower()
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    
    all_users = csv_handler.get_all_users()
    all_posts = []
    
    # Flatten all posts from all users
    for user in all_users:
        for post in user['posts']:
            post['author_email'] = user['email']
            post['author_mode'] = user['mode']
            all_posts.append(post)
    
    # Filter by search query
    if search_query:
        all_posts = [
            p for p in all_posts
            if search_query in p['title'].lower() or search_query in p['content'].lower()
        ]
    
    # Sort by created_at (newest first)
    all_posts.sort(key=lambda x: x['created_at'], reverse=True)
    
    # Paginate
    start = (page - 1) * limit
    end = start + limit
    paginated_posts = all_posts[start:end]
    
    return jsonify({
        'posts': paginated_posts,
        'page': page,
        'limit': limit,
        'total': len(all_posts)
    }), 200

@post_bp.route('/<post_id>', methods=['GET'])
@require_auth
def get_post(post_id):
    """Get a single post by ID."""
    all_users = csv_handler.get_all_users()
    
    for user in all_users:
        for post in user['posts']:
            if post['id'] == post_id:
                post['author_email'] = user['email']
                post['author_mode'] = user['mode']
                return jsonify(post), 200
    
    return jsonify({'error': 'Post not found'}), 404

@post_bp.route('/<post_id>/reply', methods=['POST'])
@require_auth
def reply_to_post(post_id):
    """Add a reply to a post (max 5 replies before read-only)."""
    user_id = session.get('user_id')
    data = request.get_json()
    reply_content = data.get('content', '').strip()
    
    if len(reply_content) > Config.POST_MAX_LENGTH:
        return jsonify({'error': f'Reply must be max {Config.POST_MAX_LENGTH} characters'}), 400
    
    if 'http' in reply_content or '@' in reply_content:
        return jsonify({'error': 'No links or mentions allowed'}), 400
    
    all_users = csv_handler.get_all_users()
    post_author_id = None
    post_index = None
    
    # Find the post
    for user in all_users:
        for i, post in enumerate(user['posts']):
            if post['id'] == post_id:
                if len(post.get('replies', [])) >= Config.POST_MAX_REPLIES:
                    return jsonify({'error': 'Post is read-only (max replies reached)'}), 403
                
                post_author_id = user['id']
                post_index = i
                
                reply = {
                    'id': str(uuid.uuid4()),
                    'author_id': user_id,
                    'content': reply_content,
                    'created_at': AuthUtil.get_timestamp()
                }
                
                post['replies'].append(reply)
                user['posts'][i] = post
                csv_handler.update_user(post_author_id, {'posts': user['posts']})
                
                return jsonify(reply), 201
    
    return jsonify({'error': 'Post not found'}), 404

@post_bp.route('/<post_id>', methods=['DELETE'])
@require_auth
def delete_post(post_id):
    """Delete a post (only by author)."""
    user_id = session.get('user_id')
    user = csv_handler.get_user_by_id(user_id)
    
    for i, post in enumerate(user['posts']):
        if post['id'] == post_id:
            user['posts'].pop(i)
            csv_handler.update_user(user_id, {'posts': user['posts']})
            return jsonify({'message': 'Post deleted'}), 200
    
    return jsonify({'error': 'Post not found or unauthorized'}), 404

