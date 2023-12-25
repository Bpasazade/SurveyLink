// user.js
import { writable } from "svelte/store";

// storedUser is the user object stored in localStorage
const storedUser = localStorage.getItem('user');
export const user = writable(storedUser ? JSON.parse(storedUser) : null);

// Subscribe to user changes and store in localStorage
user.subscribe(($user) => {
  localStorage.setItem('user', JSON.stringify($user));
});