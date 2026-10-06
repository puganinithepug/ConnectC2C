import React, { useState } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import '../styles/components/MessageThread.css';

const MessageThread = ({
  messages,
  currentUserId,
  onSendMessage,
  otherUserEmail,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      await onSendMessage(newMessage);
      setNewMessage('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="message-thread">
      <div className="message-header">
        <h3>Chat with {otherUserEmail}</h3>
      </div>

      <div className="messages-list">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet. Start a conversation!</p>
        ) : (
          messages.map((message) => {
            const isSent = message.sender_id === currentUserId;
            const isExpired =
              message.expires_at && new Date().getTime() / 1000 > message.expires_at;

            return (
              <div
                key={message.id}
                className={`message-item ${isSent ? 'sent' : 'received'} ${
                  isExpired ? 'expired' : ''
                }`}
              >
                <div className="message-bubble">
                  <p className="message-text">{message.content}</p>
                  <span className="message-time">
                    {new Date(message.created_at * 1000).toLocaleTimeString()}
                  </span>
                  {isExpired && <span className="message-expired">(Expired)</span>}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="message-input-area">
        <Input
          placeholder="Type a message (expires in 24h)..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          disabled={sending}
        />
        <Button
          variant="default"
          size="sm"
          onClick={handleSendMessage}
          disabled={sending || !newMessage.trim()}
        >
          {sending ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
};

export default MessageThread;

