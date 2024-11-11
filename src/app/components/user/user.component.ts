import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../../constants/constant';
import { IUser } from '../../models/interfaces/user';
import { CommonModule } from '@angular/common';
import { User } from '../../models/class/user';
import { UserService } from '../../services/user.service';
import { APIResponse } from '../../models/interfaces/api-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  // encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {

  http = inject(HttpClient);
  userService = inject(UserService);
  router: Router = inject(Router);

  userObj = new User;

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  userFormGroup: FormGroup = new FormGroup({
    id: new FormControl(0),
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  }, { validators: this.passwordMatchValidator });

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    if (false) { }
    else {
      this.userObj = new User();
    }
  }

  register() {
    const formValue = this.userFormGroup.value;
    this.userObj.username = formValue.username;
    this.userObj.password = formValue.password;
    this.userObj.email = formValue.email;

    this.userService.createUser(this.userObj).subscribe((res: APIResponse) => {
      this.router.navigate(['login']);
    }, 
  error => {
    console.log(error)
    alert(error.error.message)
  });
  }
}
