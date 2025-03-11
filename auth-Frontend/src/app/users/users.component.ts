import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class UsersComponent implements OnInit {
  arr: any[] = []; 

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsers().subscribe(
      (data) => {
        console.log(data);

        
        this.arr = data.users ; 
        console.log(this.arr);
        

        console.log(this.arr, 'From users cmp');
      },
      (error) => alert('Error Occurred!')
    );
  }

  delete(id: string) {
    if (!id) {
      alert('User ID not found');
      return;
    }
  
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(id).subscribe(
        () => {
          alert('User deleted successfully');
  
          // Remove the deleted user from the `arr` array to update UI
          this.arr = this.arr.filter(user => user._id !== id);
        },
        (error) => {
          console.error('Delete error:', error);
          alert('Failed to delete user');
        }
      );
    }
  }
  
  
}

