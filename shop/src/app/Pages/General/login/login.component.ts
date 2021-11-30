import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { IUser } from 'src/model/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string = "";
  pass: string = "";
  data: IUser | undefined
  prisijungta: string = "";
  visibility: string = "password"
  visibilityIcon: string = "visibility"
  constructor(
    private service: ApiService
  ) { }

  ngOnInit(): void {
  }

  loginUser() {

    console.log(this.name + "   " + this.pass)

    this.service.getUserLogin(this.name)
      .subscribe(
        data => {
          this.data = data;
          console.log(this.data);
        },
        error => {
          console.log(error);
        }
      );

    if (this.data?.login == this.name && this.data?.password == this.pass) this.prisijungta = "Prisijungta"
    else this.prisijungta = "Neteisingas prisijungimas"
  }

  myFunction() {
    if (this.visibility == "password") {
      this.visibility = "text"
      this.visibilityIcon = "visibility_off"
    }
    else {
      this.visibility = "password"
      this.visibilityIcon = "visibility"
    }
  }
}
