import React from 'react';
import Card from './Card';
import Button from './Button';
import '../styles/components/UserCard.css';

const UserCard = ({ user, onConnect, onViewProfile }) => {
  return (
    <Card className="user-card">
      <div className="user-card-header">
        <h3 className="user-name">{user.name || 'Unnamed User'}</h3>
        <span className="user-mode-badge">
          {user.mode === 'consultant' ? '👨‍💼 Consultant' : '🏢 Client'}
        </span>
      </div>

      <div className="user-card-body">
        <p className="user-email">{user.email}</p>

        {user.industries && user.industries.length > 0 && (
          <div className="user-industries">
            {user.industries.map((industry) => (
              <span key={industry} className="industry-tag">
                {industry}
              </span>
            ))}
          </div>
        )}

        {user.profile?.github_link && (
          <a
            href={user.profile.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            GitHub Profile
          </a>
        )}
      </div>

      <div className="user-card-footer">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProfile(user.id)}
        >
          View Profile
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onConnect(user.id)}
        >
          Connect
        </Button>
      </div>
    </Card>
  );
};

export default UserCard;

