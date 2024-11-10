import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileComponent } from './file.component';
import { FileService } from '../../services/file.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('FileComponent', () => {
  let component: FileComponent;
  let fixture: ComponentFixture<FileComponent>;
  let fileService: FileService;

  beforeEach(async () => {
    const dataServiceMock = {
      fetchData: jasmine.createSpy('fetchData').and.returnValue(of({
        success: true,
        data: [
          {
            "name": "test1.txt",
            "type": "application/text",
            "originalSize": "1234",
            "zippedSize": "1234",
            "UserId": 1
          }
        ],
        message: "test 1 runing",
        status: 200,
      }))
    };

    await TestBed.configureTestingModule({
      imports: [
        FileComponent,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: FileService, useValue: dataServiceMock }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fileService = TestBed.inject(FileService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
