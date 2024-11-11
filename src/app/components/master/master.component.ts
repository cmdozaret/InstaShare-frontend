import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MasterComponent {
  title = environment.PROYECT_NAME;

}
