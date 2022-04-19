import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { EncrDecrService } from 'src/app/services/EncrDecrService';
import { IUser } from 'src/model/IUser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: IUser = new IUser();
  confirmPass: string = ""

  constructor(
    private service: ApiService,
    private route: Router,
    private EncrDecr: EncrDecrService
  ) { }

  ngOnInit(): void {
  }

  registerUser() {

    let user: IUser = this.register!;

    if (user.name == "" || user.lastname == "" || user.email == "" || user.phone == "" || user.login == "" || user.password == "") {
      this.displayStatus('Please fill all information fields!')
    }
    else if(user.password != this.confirmPass) {
      this.displayStatus('Your password did not match!')
    }
    else {
      user.type = "user"

      user.password = this.EncrDecr.set('123456$#@$^@1ERF', user.password);
      var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', user.password);

      this.service.addUser(user).subscribe({
        next: (data) => {
          this.route.navigate(["/login"]).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.log(error);
        }}
      )
    }

  }

  displayStatus(text: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
    })
  }

}
