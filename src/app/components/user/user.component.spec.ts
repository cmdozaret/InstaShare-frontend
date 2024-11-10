import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;

  beforeEach(async () => {
    const dataServiceMock = {
      fetchData: jasmine.createSpy('fetchData').and.returnValue(of({
        success: true,
        data: [
          {
            "id": 1,
            "username": "testuser1",
            "email": "test1@example.com"
          }
        ],
        message: "test 1 runing",
        status: 200,
      }))
    };

    await TestBed.configureTestingModule({
      imports: [
        UserComponent,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: UserService, useValue: dataServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
