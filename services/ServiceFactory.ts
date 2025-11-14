// Factory pattern + Dependency Injection
// Single instance management (Singleton-like behavior for services)

import { LocalStorageService } from './storage/LocalStorageService';
import { ValidationService } from './validation/ValidationService';
import { UserRepository } from './repository/UserRepository';
import { AuthService } from './auth/AuthService';
import { IStorageService } from './storage/IStorageService';
import { IValidationService } from './validation/IValidationService';
import { IUserRepository } from './repository/IUserRepository';
import { IAuthService } from './auth/IAuthService';

class ServiceFactory {
  private static storageService: IStorageService | null = null;
  private static validationService: IValidationService | null = null;
  private static userRepository: IUserRepository | null = null;
  private static authService: IAuthService | null = null;

  static getStorageService(): IStorageService {
    if (!this.storageService) {
      this.storageService = new LocalStorageService();
    }
    return this.storageService;
  }

  static getValidationService(): IValidationService {
    if (!this.validationService) {
      this.validationService = new ValidationService();
    }
    return this.validationService;
  }

  static getUserRepository(): IUserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepository(this.getStorageService());
    }
    return this.userRepository;
  }

  static getAuthService(): IAuthService {
    if (!this.authService) {
      this.authService = new AuthService(
        this.getUserRepository(),
        this.getStorageService(),
        this.getValidationService()
      );
    }
    return this.authService;
  }

  // For testing: Reset all services
  static reset(): void {
    this.storageService = null;
    this.validationService = null;
    this.userRepository = null;
    this.authService = null;
  }
}

export default ServiceFactory;
