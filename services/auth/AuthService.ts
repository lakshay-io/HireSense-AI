// Single Responsibility: Handle authentication logic
// Dependency Inversion: Depends on abstractions

import { IAuthService } from './IAuthService';
import { IUserRepository } from '../repository/IUserRepository';
import { IStorageService } from '../storage/IStorageService';
import { IValidationService } from '../validation/IValidationService';
import { AuthUser, LoginCredentials, RegisterData, ChangePasswordData, ResetPasswordData, User } from '@/types/auth.types';

export class AuthService implements IAuthService {
  private readonly CURRENT_USER_KEY = 'hiresense_current_user';

  constructor(
    private userRepository: IUserRepository,
    private storage: IStorageService,
    private validator: IValidationService
  ) {}

  async login(credentials: LoginCredentials): Promise<AuthUser | null> {
    // Validate input
    const emailValidation = this.validator.validateEmail(credentials.email);
    if (!emailValidation.isValid) {
      throw new Error(emailValidation.errors.join(', '));
    }

    // Find user
    const user = this.userRepository.findByEmail(credentials.email);
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    // Create auth user and store session
    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    this.storage.setItem(this.CURRENT_USER_KEY, authUser);
    return authUser;
  }

  async register(data: RegisterData): Promise<AuthUser | null> {
    // Validate all inputs
    const emailValidation = this.validator.validateEmail(data.email);
    if (!emailValidation.isValid) {
      throw new Error(emailValidation.errors.join(', '));
    }

    const passwordValidation = this.validator.validatePassword(data.password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    const nameValidation = this.validator.validateName(data.name);
    if (!nameValidation.isValid) {
      throw new Error(nameValidation.errors.join(', '));
    }

    // Check if user already exists
    if (this.userRepository.findByEmail(data.email)) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: this.generateId(),
      email: data.email,
      name: data.name,
      password: data.password,
      createdAt: new Date().toISOString(),
    };

    this.userRepository.save(newUser);

    // Auto-login after registration
    const authUser: AuthUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };

    this.storage.setItem(this.CURRENT_USER_KEY, authUser);
    return authUser;
  }

  logout(): void {
    this.storage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser(): AuthUser | null {
    return this.storage.getItem<AuthUser>(this.CURRENT_USER_KEY);
  }

  async changePassword(userId: string, data: ChangePasswordData): Promise<boolean> {
    // Validate new password
    const passwordValidation = this.validator.validatePassword(data.newPassword);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    // Find user
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify old password
    if (user.password !== data.oldPassword) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = data.newPassword;
    return this.userRepository.update(user);
  }

  async resetPassword(data: ResetPasswordData): Promise<boolean> {
    // Validate email
    const emailValidation = this.validator.validateEmail(data.email);
    if (!emailValidation.isValid) {
      throw new Error(emailValidation.errors.join(', '));
    }

    // Validate new password
    const passwordValidation = this.validator.validatePassword(data.newPassword);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    // Find user
    const user = this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('No user found with this email');
    }

    // Update password
    user.password = data.newPassword;
    return this.userRepository.update(user);
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
