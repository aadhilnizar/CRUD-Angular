import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[FormsModule,CommonModule,ReactiveFormsModule,RouterModule],
  standalone:true
})
export class RegisterComponent {
  firstName = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    console.log(this.firstName, this.email,this.password );
    
    this.authService.register({ firstName: this.firstName, email: this.email, password: this.password }).subscribe(
      () => this.router.navigate(['/login']),
      (error) => alert('Registration failed!')
    );
  }
}