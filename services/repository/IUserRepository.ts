// Repository pattern: Abstract data access

import { User } from '@/types/auth.types';

export interface IUserRepository {
  findByEmail(email: string): User | null;
  findById(id: string): User | null;
  save(user: User): void;
  update(user: User): boolean;
  getAll(): User[];
}
