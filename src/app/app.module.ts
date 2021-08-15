import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './http-interceptors';
import { NotFoundComponent } from './not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginGuardService } from './guards/login-guard.service';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    NavigationComponent,
    AboutComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuardService,
    LoginGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
