import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor (private authService : AuthService,private router :Router) {}
  login() {
    console.log(this.email , this.password);


      this.authService.login({email: this.email, password: this.password}).subscribe(
        () => {
           this.router.navigate(['/users'])},
        (error) => alert('Login failed!')
      );
  }
}
