// Simple local "database" for the assignment
const USERS_KEY = 'store_users_v1';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
}
function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}
function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

// Hash password with SHA-256
export async function hashPassword(pw) {
  try {
    const enc = new TextEncoder().encode(pw);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    const hex = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
    return `sha256:${hex}`;
  } catch {
    // fallback
    return `plain:${pw}`;
  }
}

export function findUserByEmail(email) {
  const e = normalizeEmail(email);
  return loadUsers().find(u => u.email === e) || null;
}

export async function createUser({ firstName, surname, email, password }) {
  const users = loadUsers();
  const e = normalizeEmail(email);
  if (users.some(u => u.email === e)) {
    throw new Error('Email already registered');
  }
  const passwordHash = await hashPassword(password);
  const user = {
    id: (crypto.randomUUID?.() ?? Date.now().toString()),
    firstName, surname, email: e, passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  return user;
}

export async function verifyLogin(email, password) {
  const user = findUserByEmail(email);
  if (!user) return { ok: false };
  const hash = await hashPassword(password);
  return { ok: user.passwordHash === hash, user };
}
