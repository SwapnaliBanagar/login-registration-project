import { Routes } from '@angular/router';
import { LoginPage } from './components/pages/login-page/login-page';
import { Registration } from './components/pages/registration/registration';
import { UpdatePage } from './components/pages/update-page/update-page';
import { SuccessPage } from './components/pages/success-page/success-page';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: "login", component: LoginPage },
    { path: "register", component: Registration },
    { path: "update", component: UpdatePage },
    { path: "loginSuccess", component: SuccessPage },
];
