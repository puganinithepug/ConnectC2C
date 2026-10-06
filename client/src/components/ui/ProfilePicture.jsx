// It’s a “profile picture” component that shows a user’s face in a nice circle, and it smartly falls back to other visuals when a real photo isn’t available.

// If you give it a photo link (src): it shows the photo.
// If the photo fails to load, it automatically switches to a backup look.
// The backup look is either the person’s initials (if you gave a name) or a simple user icon.
// If you don’t give a photo but you give a name (name): it shows the person’s initials instead.
// If you give neither a photo nor a name: it shows a generic user icon.
// You can also choose the size (small/medium/large/etc.) and whether it’s clickable (then it looks/behaves like a button)

import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  className = '',
  fallbackIcon = User,
  onClick,
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const baseClasses = `
    ${sizeClasses[size]}
    rounded-full
    flex
    items-center
    justify-center
    font-medium
    ${onClick ? 'cursor-pointer hover:ring-2 hover:ring-primary/20' : ''}
    transition-all
    duration-200
    ${className}
  `.trim();

  const FallbackIcon = fallbackIcon;

  if (src) {
    return (
      <div className={baseClasses} onClick={onClick} {...props}>
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            const parent = e.target.parentNode;
            e.target.style.display = 'none';

            const fallback = document.createElement('div');
            fallback.className = 'w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-medium';

            if (name) {
              fallback.textContent = getInitials(name);
            } else {
              const icon = document.createElement('div');
              icon.innerHTML = `<svg class="${iconSizes[size]} text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`;
              fallback.appendChild(icon);
            }

            parent.appendChild(fallback);
          }}
        />
      </div>
    );
  }

  if (name) {
    return (
      <div
        className={`${baseClasses} bg-gradient-to-br from-primary to-secondary text-white`}
        onClick={onClick}
        {...props}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600`}
      onClick={onClick}
      {...props}
    >
      <FallbackIcon className={iconSizes[size]} />
    </div>
  );
};

export default Avatar;