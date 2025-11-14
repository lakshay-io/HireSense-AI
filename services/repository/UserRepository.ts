// Dependency Inversion: Depends on abstraction (IStorageService)

import { IUserRepository } from './IUserRepository';
import { IStorageService } from '../storage/IStorageService';
import { User } from '@/types/auth.types';

export class UserRepository implements IUserRepository {
  private readonly USERS_KEY = 'hiresense_users';

  constructor(private storage: IStorageService) {}

  findByEmail(email: string): User | null {
    const users = this.getAll();
    return users.find(u => u.email === email) || null;
  }

  findById(id: string): User | null {
    const users = this.getAll();
    return users.find(u => u.id === id) || null;
  }

  save(user: User): void {
    const users = this.getAll();
    users.push(user);
    this.storage.setItem(this.USERS_KEY, users);
  }

  update(user: User): boolean {
    const users = this.getAll();
    const index = users.findIndex(u => u.id === user.id);

    if (index !== -1) {
      users[index] = user;
      this.storage.setItem(this.USERS_KEY, users);
      return true;
    }

    return false;
  }

  getAll(): User[] {
    return this.storage.getItem<User[]>(this.USERS_KEY) || [];
  }
}
