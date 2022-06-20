import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'shop';

  constructor(private authService: AuthService) {}

  guest: boolean = true;
  signout: boolean = false;
  worker: boolean = false;
  username: string = '';

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
    if (localStorage.getItem('type') == 'guest') {
      this.guest = true;
      this.signout = false;
      this.worker = false;
    } else if (
      localStorage.getItem('type') == 'admin' ||
      localStorage.getItem('type') == 'seller'
    ) {
      this.worker = true;
      this.guest = false;
      this.signout = true;
    } else {
      this.guest = false;
      this.signout = true;
      this.worker = false;
    }
  }

  signOutUser() {
    localStorage.setItem('username', 'Guest');
    localStorage.setItem('type', 'guest');
    localStorage.setItem('userId', '');
    window.location.reload();
    this.guest = true;
    this.signout = false;

    this.authService.logout();
  }
}
