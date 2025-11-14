// Interface Segregation: Validation contracts

import { ValidationResult } from '@/types/auth.types';

export interface IValidationService {
  validateEmail(email: string): ValidationResult;
  validatePassword(password: string): ValidationResult;
  validateName(name: string): ValidationResult;
  validatePasswordMatch(password: string, confirmPassword: string): ValidationResult;
}
