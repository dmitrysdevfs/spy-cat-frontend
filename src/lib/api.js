const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/backend';

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiRequest(endpoint, options = {}) {
  // Ensure we don't have double slashes if BASE_URL ends with one and endpoint starts with one
  const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${cleanBaseUrl}${cleanEndpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    let errorData;
    const text = await response.text();
    try {
      errorData = JSON.parse(text);
    } catch (e) {
      errorData = { detail: 'Unknown error occurred or non-JSON response' };
    }
    throw new ApiError(errorData.detail || 'API request failed', response.status, errorData);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/**
 * API methods for Spy Cats
 */
export const catsApi = {
  /**
   * List all spy cats
   */
  list: () => apiRequest('/cats/'),

  /**
   * Get single cat details
   */
  get: (id) => apiRequest(`/cats/${id}/`),

  /**
   * Add a new spy cat
   */
  create: (data) => apiRequest('/cats/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  /**
   * Update a cat's salary
   */
  updateSalary: (id, salary) => apiRequest(`/cats/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify({ salary }),
  }),

  /**
   * Delete a spy cat
   */
  delete: (id) => apiRequest(`/cats/${id}/`, {
    method: 'DELETE',
  }),
};
