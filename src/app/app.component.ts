import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { environment } from '../environments/environment.development';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { UserComponent } from './components/user/user.component';
import { LoginService } from './services/login.service';
import { APIResponse } from './models/interfaces/api-response';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    AuthComponent,
    UserComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  router: Router = inject(Router);

  title: string = environment.PROYECT_NAME;
  currentComponent: string = '';
  username: string = '';
  loginService = inject(LoginService);

  loadModule(component: string) {
    this.router.navigate([component]);
    // this.currentComponent = component;
  }

  logout() {
    this.loginService.logout().subscribe((res: APIResponse) => {
      if (res.success) {
        localStorage.removeItem(environment.LOCAL_STORAGE_TKN);
        localStorage.removeItem(environment.LOCAL_STORAGE_RTK);
        this.router.navigate(['login']);
      }
      else {
        alert(`Something went wrong: ${res.message}`);
      }
    });
  }

  isLoggedIn(): boolean {
    if (this.loginService.isLoggedIn()) {
      this.username = this.loginService.getUserLoggedProperty('username');
      return true;
    }
    this.username = '';
    return false;
  }

  getUserLoggedProperty(propertyName: string): any | null {
    return this.loginService.getUserLoggedProperty(propertyName);
  }

  deleteProfile() {
    if (!confirm('Are you sure you want to delete your profile?')) {
      return;
    }
    if (localStorage.getItem(environment.LOCAL_STORAGE_TKN) === null) {
      alert('You must be logged in to delete your profile');
      return;
    }
    let id = this.loginService.getUserLoggedProperty('id');
    return this.loginService.deleteUser(id).subscribe((res: APIResponse) => {
      localStorage.removeItem(environment.LOCAL_STORAGE_TKN);
      localStorage.removeItem(environment.LOCAL_STORAGE_RTK);
      this.router.navigate(['login']);
    })
  }

}
