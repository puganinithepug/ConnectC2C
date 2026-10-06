const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const fetchWithAuth = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include', // Send cookies for session
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  // Handle session expiration
  if (response.status === 401) {
    // Clear local auth state and redirect to login
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  return response;
};

export const authAPI = {
  login: async (email, password) => {
    const response = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (email, password) => {
    const response = await fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetchWithAuth('/auth/logout', {
      method: 'POST',
    });
    return response.json();
  },

  getSession: async () => {
    const response = await fetchWithAuth('/auth/session', {
      method: 'GET',
    });
    return response.json();
  },
};

export const userAPI = {
  getCurrentUser: async () => {
    const response = await fetchWithAuth('/users/me', {
      method: 'GET',
    });
    return response.json();
  },

  getUser: async (userId) => {
    const response = await fetchWithAuth(`/users/${userId}`, {
      method: 'GET',
    });
    return response.json();
  },

  updateMode: async (mode) => {
    const response = await fetchWithAuth('/users/me/mode', {
      method: 'PUT',
      body: JSON.stringify({ mode }),
    });
    return response.json();
  },

  updateProfile: async (profileData) => {
    const response = await fetchWithAuth('/users/me/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return response.json();
  },

  updateIndustries: async (industries) => {
    const response = await fetchWithAuth('/users/me/industries', {
      method: 'PUT',
      body: JSON.stringify({ industries }),
    });
    return response.json();
  },

  updateBehavioralPrefs: async (prefs) => {
    const response = await fetchWithAuth('/users/me/behavioral-prefs', {
      method: 'PUT',
      body: JSON.stringify(prefs),
    });
    return response.json();
  },

  searchUsers: async (query, mode = null) => {
    let url = `/users/search?q=${encodeURIComponent(query)}`;
    if (mode) url += `&mode=${mode}`;
    const response = await fetchWithAuth(url, {
      method: 'GET',
    });
    return response.json();
  },
};

export const postAPI = {
  createPost: async (title, content) => {
    const response = await fetchWithAuth('/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
    return response.json();
  },

  listPosts: async (page = 1, limit = 10, search = '') => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const response = await fetchWithAuth(url, {
      method: 'GET',
    });
    return response.json();
  },

  getPost: async (postId) => {
    const response = await fetchWithAuth(`/posts/${postId}`, {
      method: 'GET',
    });
    return response.json();
  },

  replyToPost: async (postId, content) => {
    const response = await fetchWithAuth(`/posts/${postId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    return response.json();
  },

  deletePost: async (postId) => {
    const response = await fetchWithAuth(`/posts/${postId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

export const messageAPI = {
  sendMessage: async (recipientId, content) => {
    const response = await fetchWithAuth('/messages', {
      method: 'POST',
      body: JSON.stringify({ recipient_id: recipientId, content }),
    });
    return response.json();
  },

  getConversation: async (otherUserId) => {
    const response = await fetchWithAuth(`/messages/conversation/${otherUserId}`, {
      method: 'GET',
    });
    return response.json();
  },

  listConversations: async () => {
    const response = await fetchWithAuth('/messages/conversations', {
      method: 'GET',
    });
    return response.json();
  },

  deleteMessage: async (messageId) => {
    const response = await fetchWithAuth(`/messages/${messageId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

export const searchAPI = {
  trackSearch: async (query) => {
    const response = await fetchWithAuth('/search/track', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    return response.json();
  },

  getSearchHistory: async () => {
    const response = await fetchWithAuth('/search/history', {
      method: 'GET',
    });
    return response.json();
  },
};

