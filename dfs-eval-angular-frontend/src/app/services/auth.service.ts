import { Injectable, signal } from '@angular/core';

export interface User {
  email: string;
  admin: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);

  user = this._user.asReadonly();

  login(email: string) {
    const admin = email === 'a@a.com';

    this._user.set({
      email,
      admin,
    });
  }

  logout() {
    this._user.set(null);
  }

  isLogged(): boolean {
    return this._user() !== null;
  }

  isAdmin(): boolean {
    return this._user()?.admin ?? false;
  }

  getEmail(): string | null {
    return this._user()?.email ?? null;
  }
}
