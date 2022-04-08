import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

import * as CryptoJS from 'crypto-js';

const SECURITY_KEY = 'Bar1g01';

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
    const encrypToken = CryptoJS.AES.encrypt(token, SECURITY_KEY).toString();

    this.sessionStorageService.clear(TOKEN_KEY);
    this.sessionStorageService.store(TOKEN_KEY, encrypToken);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    let token = this.sessionStorageService.retrieve(TOKEN_KEY);
    if (token) {
      var bytes = CryptoJS.AES.decrypt(token, SECURITY_KEY);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);

      return originalText;
    } else {
      return null
    }
  }

  public saveRefreshToken(refreshToken: string): void {
    const encrypRefreshToken = CryptoJS.AES.encrypt(refreshToken, SECURITY_KEY).toString();

    this.sessionStorageService.clear(REFRESHTOKEN_KEY);
    this.sessionStorageService.store(REFRESHTOKEN_KEY, encrypRefreshToken);
  }

  public getRefreshToken(): string | null {
    let refreshToken = this.sessionStorageService.retrieve(REFRESHTOKEN_KEY);

    if (refreshToken) {
      var bytes = CryptoJS.AES.decrypt(refreshToken, SECURITY_KEY);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);

      return originalText;
    } else {
      return null
    }

  }

  public saveUser(user: any): void {
    const encrypInfoUser = CryptoJS.AES.encrypt(JSON.stringify(user), SECURITY_KEY).toString();

    this.sessionStorageService.clear(USER_KEY);
    this.sessionStorageService.store(USER_KEY, encrypInfoUser);
  }

  public getUser(): any {
    let user = this.sessionStorageService.retrieve(USER_KEY);

    if (user) {
      var bytes = CryptoJS.AES.decrypt(user, SECURITY_KEY);
      var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return originalText;
    }
    return {};
  }
}
