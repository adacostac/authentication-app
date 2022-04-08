import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private sessionStorageService: SessionStorageService) { }
  signOut(): void {
    this.sessionStorageService.clear();
  }

  public saveToken(token: string): void {
    this.sessionStorageService.clear(TOKEN_KEY);
    this.sessionStorageService.store(TOKEN_KEY, token);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return this.sessionStorageService.retrieve(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    this.sessionStorageService.clear(REFRESHTOKEN_KEY);
    this.sessionStorageService.store(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return this.sessionStorageService.retrieve(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    this.sessionStorageService.clear(USER_KEY);
    this.sessionStorageService.store(USER_KEY, user);
  }

  public getUser(): any {
    const user = this.sessionStorageService.retrieve(USER_KEY);
    if (user) {
      return user;
    }
    return {};
  }
}
