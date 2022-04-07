import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { EncrDecrService } from 'src/app/services/EncrDecrService';
import { IUser } from 'src/types/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name: string = "";
  pass: string = "";
  data: IUser = {
    id: 0,
    name: "",
    lastname: "",
    email: "",
    phone: "",
    type: "guest",
    login: "Guest",
    password: ""
  }
  prisijungta: string = "";

  visibility: string = "password"
  visibilityIcon: string = "visibility"
  constructor(
    private service: ApiService,
    private route: Router,
    private EncrDecr: EncrDecrService
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
          if (this.data?.login == this.name && this.EncrDecr.get('123456$#@$^@1ERF', this.data?.password) == this.pass) {
            this.prisijungta = "Prisijungta"

            this.route.navigate(["/home"]).then(() => {
              window.location.reload();
            });
            //window.location.reload();
          }
          else {
            console.log(this.name + this.pass)
            this.prisijungta = "Neteisingas prisijungimas"

          }

          localStorage.setItem('username', this.data?.login);
          localStorage.setItem('type', this.data?.type);
          localStorage.setItem('userId', this.data?.id.toString());
        },
        error => {
          console.log(error);
        }
      );


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
