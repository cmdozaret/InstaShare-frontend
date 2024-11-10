import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { APIResponse } from '../../models/interfaces/api-response';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  loginService = inject(LoginService);
  router = inject(Router);

  loginFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  loginObj: any = {
    username: '',
    password: ''
  };

  onLogin() {
    const formValue = this.loginFormGroup.value;
    this.loginObj.username = formValue.username;
    this.loginObj.password = formValue.password;
    this.loginService.login(this.loginObj).subscribe((res: APIResponse) => {
      if (res.success) {
        localStorage.setItem(environment.LOCAL_STORAGE_TKN, res.data.accessToken);
        localStorage.setItem(environment.LOCAL_STORAGE_RTK, res.data.refreshToken);
        localStorage.setItem(`${environment.PROYECT_NAME}_loggedUser`, JSON.stringify( res.data.user));
        this.router.navigate(['file']);
      }
      else {
        alert(res.message);
      }
    })
  }

}
