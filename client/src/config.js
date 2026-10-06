// Backend API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const config = {
  API_BASE_URL,
  
  // Endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    SWITCH_MODE: '/users/switch-mode',
  },
  
  POSTS: {
    CREATE: '/posts',
    LIST: '/posts',
    GET: '/posts/:id',
    LIKE: '/posts/:id/like',
    UNLIKE: '/posts/:id/unlike',
    REPLY: '/posts/:id/reply',
  },
  
  MESSAGES: {
    LIST: '/messages',
    GET_CONVERSATION: '/messages/:userId',
    SEND: '/messages',
    MARK_READ: '/messages/:id/read',
  },
  
  CONSULTANTS: {
    LIST: '/consultants',
    GET: '/consultants/:id',
    RECOMMENDATIONS: '/consultants/recommendations',
  },
  
  CLIENTS: {
    LIST: '/clients',
    GET: '/clients/:id',
    RECOMMENDATIONS: '/clients/recommendations',
  },
  
  SEARCH: {
    POSTS: '/search/posts',
    CONSULTANTS: '/search/consultants',
  },
  
  // Constraints
  CONSTRAINTS: {
    POST_MAX_LENGTH: 200,
    POST_MAX_REPLIES: 5,
    MESSAGE_EXPIRY_HOURS: 24,
    FIRST_MESSAGE_EXPIRY_HOURS: 48,
    SEARCH_HISTORY_DAYS: 30,
  },
};

export default config;

