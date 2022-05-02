import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TokenStorageService, EventBusService } from 'ep-frontend-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private roles: string[] = [];

  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  eventBusSub?: Subscription;

  // IMPLEMENTATION OIDC
  isAuthenticated = false;

  constructor(private tokenStorageService: TokenStorageService,
    private eventBusService: EventBusService,
    private oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
    this.isAuthenticated = !!this.tokenStorageService.getToken();
    if (this.isAuthenticated) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    // IMPLEMENTATION OIDC
    this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
      console.log('app authenticated', isAuthenticated)
      this.isAuthenticated = isAuthenticated
    });
  }

  /*   logout(): void {
      this.tokenStorageService.signOut();
      this.isAuthenticated = false;
      this.roles = [];
      this.showAdminBoard = false;
      this.showModeratorBoard = false;
    } */

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  // IMPLEMENTATION OIDC

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}
