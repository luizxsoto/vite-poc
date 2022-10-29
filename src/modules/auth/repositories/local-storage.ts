const itemKey = '@positivo/auth:token';

export function saveToken(token: string) {
  localStorage.setItem(itemKey, token);
}

export function getToken() {
  return localStorage.getItem(itemKey);
}

export function removeToken() {
  return localStorage.removeItem(itemKey);
}
