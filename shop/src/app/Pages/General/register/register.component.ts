import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { IUser } from 'src/model/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: IUser = new IUser();

  constructor(
    private service: ApiService,
  ) { }

  ngOnInit(): void {
  }

  registerUser() {

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
