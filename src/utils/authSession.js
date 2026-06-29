const SESSION_KEY = "briselli_auth_session";
const LEGACY_KEY = "briselli_auth";
const ACTIVE_USER_KEY = "briselli_active_user";
const TOKEN_KEY = "briselli_token";

export function getAuthSession() {
  try {
    const sessionValue = sessionStorage.getItem(SESSION_KEY);
    if (sessionValue) return JSON.parse(sessionValue);
  } catch {
    // ignore
  }

  try {
    const activeValue = localStorage.getItem(ACTIVE_USER_KEY);
    if (activeValue) return JSON.parse(activeValue);
  } catch {
    // ignore
  }

  return null;
}

export function setAuthSession(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearAuthSession() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(LEGACY_KEY);
  localStorage.removeItem(ACTIVE_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}
