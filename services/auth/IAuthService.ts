// Interface Segregation: Authentication contracts

import { AuthUser, LoginCredentials, RegisterData, ChangePasswordData, ResetPasswordData } from '@/types/auth.types';

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthUser | null>;
  register(data: RegisterData): Promise<AuthUser | null>;
  logout(): void;
  getCurrentUser(): AuthUser | null;
  changePassword(userId: string, data: ChangePasswordData): Promise<boolean>;
  resetPassword(data: ResetPasswordData): Promise<boolean>;
  isAuthenticated(): boolean;
}
