import { getCSRFToken } from '../../utils/csrfService';

const API_URL = 'http://localhost:8000/users';

export async function signup(username, password, email) {
  const csrfToken = getCSRFToken();
  const response = await fetch(`${API_URL}/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify({ username, password, email }),
    credentials: 'include',  // Include cookies in the request
  });

  return response;
}

export async function login(username, password) {
  const csrfToken = getCSRFToken();
  const response = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });

  return response;
}

export async function logout() {
  const csrfToken = getCSRFToken();
  const response = await fetch(`${API_URL}/logout/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrfToken,
    },
    credentials: 'include',
  });

  return response;
}
