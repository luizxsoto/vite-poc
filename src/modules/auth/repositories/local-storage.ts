const itemKey = '@positivo/auth:token';

export function saveToken(token: string) {
  localStorage.setItem(itemKey, token);
}
