export const getFromLocalStorage = (key: string) => localStorage.getItem(key);
export const removeFromLocalStorage = (key: string) => localStorage.removeItem(key);
export const setToLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);
