import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shop';

  guest: boolean = true;
  signout: boolean = false;
  addItem: boolean = false;
  username: string = ""

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Guest';
    console.log(localStorage.getItem('type') == "admin" || localStorage.getItem('type') == "seller")
    if (localStorage.getItem('type') == "guest") {
      this.guest = true;
      this.signout = false;
      this.addItem = false;
    }
    else if (localStorage.getItem('type') == "admin" || localStorage.getItem('type') == "seller") {
      this.addItem = true
      this.guest = false;
      this.signout = true;
    }
    else {
      this.guest = false;
      this.signout = true;
      this.addItem = false;
    }
  }

  signOutUser() {
    localStorage.setItem('username', "Guest");
    localStorage.setItem('type', "guest");
    localStorage.setItem('userId', "0");
    window.location.reload();
    this.guest = true;
    this.signout = false;

  }

}
