import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import '../styles/components/PostCard.css';

const PostCard = ({
  post,
  onReply,
  onDelete,
  canDelete = false,
  onAuthorClick,
}) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;

    setReplyLoading(true);
    try {
      await onReply(replyContent);
      setReplyContent('');
      setReplyOpen(false);
    } finally {
      setReplyLoading(false);
    }
  };

  const isReadOnly = post.replies && post.replies.length >= 5;

  return (
    <Card className="post-card">
      <div className="post-header">
        <div className="post-meta">
          <button
            className="post-author-btn"
            onClick={() => onAuthorClick(post.author_id)}
          >
            <strong>{post.author_email}</strong>
          </button>
          <span className="post-badge">
            {post.author_mode === 'consultant' ? '👨‍💼 Consultant' : '🏢 Client'}
          </span>
          <span className="post-date">
            {new Date(post.created_at * 1000).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-text">{post.content}</p>
      </div>

      <div className="post-footer">
        <span className="post-reply-count">
          {post.replies?.length || 0} replies
          {isReadOnly && ' (Read-only)'}
        </span>

        <div className="post-actions">
          {canDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(post.id)}
              className="post-delete-btn"
            >
              Delete
            </Button>
          )}
          {!isReadOnly && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReplyOpen(!replyOpen)}
            >
              {replyOpen ? 'Cancel' : 'Reply'}
            </Button>
          )}
        </div>
      </div>

      {replyOpen && (
        <div className="post-reply-form">
          <Input
            placeholder="Write your reply (max 200 chars)..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value.slice(0, 200))}
            maxLength={200}
          />
          <div className="reply-char-count">
            {replyContent.length}/200
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={handleReplySubmit}
            disabled={replyLoading || !replyContent.trim()}
          >
            {replyLoading ? 'Sending...' : 'Send Reply'}
          </Button>
        </div>
      )}

      {post.replies && post.replies.length > 0 && (
        <div className="post-replies">
          <h4 className="replies-title">Replies</h4>
          {post.replies.map((reply) => (
            <div key={reply.id} className="reply-item">
              <div className="reply-meta">
                <strong>{reply.author_email || 'Anonymous'}</strong>
                <span className="reply-date">
                  {new Date(reply.created_at * 1000).toLocaleDateString()}
                </span>
              </div>
              <p className="reply-text">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default PostCard;

