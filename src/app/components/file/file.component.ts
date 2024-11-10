import { Component, inject, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { Constant } from '../../constants/constant';
import { IFile } from '../../models/interfaces/file';
import { FileService } from '../../services/file.service';
import { APIResponse } from '../../models/interfaces/api-response';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './file.component.html',
  styleUrl: './file.component.css'
})
export class FileComponent implements OnInit {
  http = inject(HttpClient);
  fileService = inject(FileService);
  loggedUser = localStorage.getItem(`${environment.PROYECT_NAME}_loggedUser`);
  files: IFile[] = [];
  fileObj: File | null = null;
  file: any;
  fileName: string = "";

  fileFormGroup: FormGroup = new FormGroup({
    id: new FormControl(0),
    fileName: new FormControl('', [Validators.required]),
    fileObj: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.getFiles();
  }

  trackById(index: number, item: IFile): number {
    return item.id;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.fileName = this.file.name;

      this.fileFormGroup.get('fileName')?.setValue(this.fileName);
    }
  }

  getFiles() {
    if (this.loggedUser !== null) {
      const userData = JSON.parse(this.loggedUser);
      this.fileService.getFiles(userData.id).subscribe((res: APIResponse) => {
        this.files = res.data;
      });
    }
    else {
      alert("Must log in first")
    }
  }

  uploadFile() {
    if (this.loggedUser !== null) {
      if (this.file) {
        const formData = new FormData();
        formData.append('file', this.file, this.file.name);
        this.fileService.uploadFile(formData).subscribe((res: APIResponse) => {
          this.getFiles();
          this.reset();
        });
      }
      else {
        alert("Something went wrong! Please logout and login back, then try it again")
      }
    }
    else {
      alert("Must log in first");
    }
  }

  downloadFile(file: IFile) {
    if (this.loggedUser !== null) {
      if (file) {
        const filename = file.name;
        this.fileService.downloadFile(file.id).subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          },
          error: (error) => {
            console.error('Download failed:', error);
          }
        });
      }
      else {
        alert("Something went wrong! Please logout and login back, then try it again")
      }
    }
    else {
      alert("Must log in first");
    }
  }

  deleteFile(file: IFile) {
    this.fileService.deleteFile(file.id).subscribe((res) => {
      this.getFiles();
    },
      error => {
        alert(error)
      }
    )
  }

  reset() {
    this.fileFormGroup.reset();
  }
}