import { Routes } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { UserComponent } from './components/user/user.component';
import { AuthComponent } from './components/auth/auth.component';
import { FileComponent } from './components/file/file.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'master',
        pathMatch: 'full',
    },
    {
        path: 'master',
        component: MasterComponent,
    },
    {
        path: 'login',
        component: AuthComponent,
    },
    {
        path: 'register',
        component: UserComponent,
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'file',
                component: FileComponent,
                canActivate: [
                    authGuard,
                ],
            },
        ]
    },
];
