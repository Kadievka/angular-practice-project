import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardService } from './guards/login-guard.service';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
  { path: '404', component: NotFoundComponent },
  { path: 'About', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
