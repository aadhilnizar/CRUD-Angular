import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterModule,RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

    constructor(private authService : AuthService , private route : ActivatedRoute,private router : Router){}
  username = '';
  email = '';
  password = '';
  userDetail : any = {}
  
  ngOnInit() {
   this.route.paramMap.subscribe(params =>{
    const id = params.get('id');
    console.log(id);
    this.authService.getUserById(id).subscribe(
      (data) => {
        this.userDetail = data;  
        console.log(data); 
      },
      (error) => {
        alert('Login failed!');  
      }
    );
    
   })
  }






  edit() {
    const id = this.userDetail?._id;
    const updatedUser = {
      firstName: this.userDetail.firstName,
      email: this.userDetail.email,
      password: this.userDetail.password
    };

    console.log('Updating using id', id);

    this.authService.updateUser(id, updatedUser).subscribe(
      (data) => {
        alert('User Updated Successfully');
        this.router.navigate(['/users']); 
      },
      (error) => {
        alert('Failed to update user!');
      }
    );
  }
      
  }

