import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number,
  name: string,
  secondName: string,
  lastName: string,
  secondLastName: string,
  email: string,
  createdAt: string,
  rut: string,
  role: number,
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor (private router: Router,) {}
  user: User | undefined;
  ngOnInit(): void {
    // this.user = ;
    const userData = window.localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  logout(): void {
    window.localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
