export const KEY_ACCESS_TOKEN = "access_token";

//while checking if logged in
export function getItem(key) {
    return localStorage.getItem(key);
}

//after log in
export function setItem(key, value) {
    localStorage.setItem(key, value);
}

//while log out
export function removeItem(key) {
    localStorage.removeItem(key);
}