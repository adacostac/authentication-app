
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { FormsModule } from '@angular/forms';
import {
  AuthProvider,
  EpFrontendLibModule,
  TokenStorageService,
  AuthService,
  EventBusService,
  TOKEN_HEADER_KEY,
  ENCRYP_SECURITY_KEY
} from 'ep-frontend-lib';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    EpFrontendLibModule
  ],
  providers: [
    TokenStorageService,
    {
      provide: TOKEN_HEADER_KEY,
      useValue: 'x-access-token'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: AuthProvider,
      deps: [
        TokenStorageService,
        AuthService,
        EventBusService,
        TOKEN_HEADER_KEY
      ],
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
