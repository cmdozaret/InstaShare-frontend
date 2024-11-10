import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { LoginService } from '../../services/login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let loginService: LoginService;

  beforeEach(async () => {
    const dataServiceMock = {
      fetchData: jasmine.createSpy('fetchData').and.returnValue(of({
        success: true,
        data: {
          "accessToken": "accessToken",
          "refreshToken": "refreshToken",
          "user": {
            "id": 1,
            "username": "testuser1",
            "email": "test1@example.com"
          }
        },
        message: "test 1 runing",
        status: 200,
      }))
    };

    await TestBed.configureTestingModule({
      imports: [
        AuthComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: LoginService, useValue: dataServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
