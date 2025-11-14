// Type definitions for authentication system

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
