import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/model/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string = "";
  pass: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  loginUser() {

    let user: IUser = this.register!;
    user.type = "user"
    this.service.addUser(user).subscribe(
      data => {

      },
      error => {
        console.log(error);
      }
    )

  }
}
