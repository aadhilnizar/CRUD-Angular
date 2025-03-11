import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getUsers()   {
      return this.http.get<any>(`${this.apiUrl}/users`)
  }
  getUserById(id :any) {
    return this.http.get(`${this.apiUrl}/users/edit/${id}`);
  }

  updateUser(id : any,updatedUser : any) {
    return this.http.put(`${this.apiUrl}/users/edit/${id}`,updatedUser)
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/users/delete/${id}`);
  }
  
}