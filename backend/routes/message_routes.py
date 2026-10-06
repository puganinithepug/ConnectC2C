from flask import Blueprint, request, jsonify, session
from middleware.auth_middleware import require_auth
from utils.csv_handler import CSVHandler
from utils.auth import AuthUtil
from config import Config
import uuid

message_bp = Blueprint('messages', __name__)
csv_handler = CSVHandler(Config.CSV_DATA_PATH)

@message_bp.route('', methods=['POST'])
@require_auth
def send_message():
    """Send a DM to another user."""
    sender_id = session.get('user_id')
    data = request.get_json()
    recipient_id = data.get('recipient_id')
    content = data.get('content', '').strip()
    
    if not recipient_id or not content:
        return jsonify({'error': 'Missing recipient_id or content'}), 400
    
    # Validate recipient exists
    recipient = csv_handler.get_user_by_id(recipient_id)
    if not recipient:
        return jsonify({'error': 'Recipient not found'}), 404
    
    sender = csv_handler.get_user_by_id(sender_id)
    now = AuthUtil.get_timestamp()
    
    # Determine if this is a first connection message
    previous_messages = [
        m for m in sender['messages']
        if m['recipient_id'] == recipient_id or m.get('sender_id') == recipient_id
    ]
    
    is_first_message = len(previous_messages) == 0
    expires_at = now + (Config.FIRST_MESSAGE_EXPIRY_HOURS * 3600 if is_first_message else Config.MESSAGE_EXPIRY_HOURS * 3600)
    
    message = {
        'id': str(uuid.uuid4()),
        'recipient_id': recipient_id,
        'sender_id': sender_id,
        'content': content,
        'created_at': now,
        'expires_at': expires_at,
        'is_first_message': is_first_message,
        'read': False
    }
    
    # Add to sender's messages
    sender['messages'].append(message)
    csv_handler.update_user(sender_id, {'messages': sender['messages']})
    
    # Add to recipient's messages
    recipient['messages'].append(message)
    csv_handler.update_user(recipient_id, {'messages': recipient['messages']})
    
    return jsonify(message), 201

@message_bp.route('/conversation/<other_user_id>', methods=['GET'])
@require_auth
def get_conversation(other_user_id):
    """Get DM conversation between current user and another user."""
    user_id = session.get('user_id')
    user = csv_handler.get_user_by_id(user_id)
    
    now = AuthUtil.get_timestamp()
    
    # Filter messages in conversation (both directions)
    conversation = [
        m for m in user['messages']
        if (m['recipient_id'] == other_user_id or m.get('sender_id') == other_user_id)
        and m

