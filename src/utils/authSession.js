const SESSION_KEY = "briselli_auth_session";
const LEGACY_KEY = "briselli_auth";

export function getAuthSession() {
  try {
    const sessionValue = sessionStorage.getItem(SESSION_KEY);
    if (sessionValue) return JSON.parse(sessionValue);
  } catch {
    // ignore
  }

  try {
    const legacyValue = localStorage.getItem(LEGACY_KEY);
    if (legacyValue) return JSON.parse(legacyValue);
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
}
