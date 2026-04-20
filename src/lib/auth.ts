export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "merchant" | "user";
  shop?: string;
  apiKey?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  companyName?: string;
  shopDomain?: string;
  phone?: string;
}

const AUTH_KEY = "xeta_auth";
const USER_KEY = "xeta_user";

export function setAuth(token: string, user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function getAuth(): { token: string | null; user: User | null } {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(AUTH_KEY);
    const userStr = localStorage.getItem(USER_KEY);
    const user = userStr ? JSON.parse(userStr) : null;
    return { token, user };
  }
  return { token: null, user: null };
}

export function clearAuth(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export function isAuthenticated(): boolean {
  const { token } = getAuth();
  return !!token;
}

export function hasRole(role: string): boolean {
  const { user } = getAuth();
  return user?.role === role;
}

export function isAdmin(): boolean {
  return hasRole("admin");
}

export function isMerchant(): boolean {
  return hasRole("merchant");
}

export function isUser(): boolean {
  return hasRole("user");
}

// Import API functions
import { login as apiLogin, register as apiRegister } from "./api";

export async function login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
  return apiLogin(credentials);
}

export async function register(data: RegisterData): Promise<{ token: string; user: User }> {
  return apiRegister(data);
}

export async function logout(): Promise<void> {
  clearAuth();
}
