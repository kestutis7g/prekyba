import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { EncrDecrService } from 'src/app/services/EncrDecrService';
import { IUser } from 'src/model/IUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: string = '';
  pass: string = '';
  data: IUser = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    type: 'guest',
    login: 'Guest',
    password: '',
  };

  visibility: string = 'password';
  visibilityIcon: string = 'visibility';
  constructor(
    private service: ApiService,
    private route: Router,
    private EncrDecr: EncrDecrService
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.service.getUserByLogin(this.login).subscribe({
      next: (data) => {
        this.data = data;
        this.validate();
      },
      error: (error) => {
        console.log(error);
        this.displayStatus('Neteisingas prisijungimo vardas arba slaptažodis');
      },
    });
  }

  validate() {
    if (
      this.data?.login == this.login &&
      this.EncrDecr.get('123456$#@$^@1ERF', this.data?.password) == this.pass
    ) {
      this.route.navigate(['/home']).then(() => {
        window.location.reload();
      });
      //window.location.reload();
      localStorage.setItem('username', this.data?.login);
      localStorage.setItem('type', this.data?.type);
      localStorage.setItem('userId', this.data?.id!.toString());
    } else {
      this.displayStatus('Neteisingas prisijungimo vardas arba slaptažodis');
    }
  }

  displayStatus(text: string) {
    Swal.fire({
      icon: 'error',
      title: '',
      text: text,
    });
  }

  changeVisibility() {
    if (this.visibility == 'password') {
      this.visibility = 'text';
      this.visibilityIcon = 'visibility_off';
    } else {
      this.visibility = 'password';
      this.visibilityIcon = 'visibility';
    }
  }
}
