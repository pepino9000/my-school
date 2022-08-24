import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/layout/layout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User | undefined;
  id = window.localStorage.getItem('user');
  userId!: number;
  constructor (
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    const userData = window.localStorage.getItem('user');
    if (userData !== null && userData !== undefined) {
      this.user = JSON.parse(userData);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
