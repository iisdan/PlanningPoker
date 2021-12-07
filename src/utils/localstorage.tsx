
export function saveLocal(key: string, data: object): void {
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function getLocal<T = any>(key: string): T|null {
  const localItem = window.localStorage.getItem(key);
  if (!localItem) {
    return null;
  }
  return JSON.parse(localItem);
}
