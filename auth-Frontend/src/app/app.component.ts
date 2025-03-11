import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialButtonComponent } from './material-button/material-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,MaterialButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'auth-Frontend';
}
