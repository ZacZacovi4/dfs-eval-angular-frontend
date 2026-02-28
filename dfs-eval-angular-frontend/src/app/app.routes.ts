import { Routes } from '@angular/router';
import { SessionsPage } from './pages/sessions/sessions.page';
import { JeuPage } from './pages/jeu/jeu.page';
import { ClassementPage } from './pages/classement/classement.page';
import { authGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: '', component: SessionsPage, canActivate: [authGuard] },
  { path: 'jeu/:id', component: JeuPage, canActivate: [authGuard] },
  { path: 'classement/:id', component: ClassementPage, canActivate: [authGuard] },
];
