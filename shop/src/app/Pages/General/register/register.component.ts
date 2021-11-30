import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { EncrDecrService } from 'src/app/services/EncrDecrService';
import { IUser } from 'src/model/IUser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: IUser = new IUser();
  confirmPass: string = ""
  error: string = ""

  constructor(
    private service: ApiService,
    private EncrDecr: EncrDecrService
  ) { }

  ngOnInit(): void {
  }

  registerUser() {

    let user: IUser = this.register!;

    if (user.password == this.confirmPass) {
      this.error = ""
      user.type = "user"

      user.password = this.EncrDecr.set('123456$#@$^@1ERF', user.password);
      var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', user.password);
      console.log('Decrypted :' + decrypted);

      this.service.addUser(user).subscribe(
        data => {

        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      this.error = "Slaptažodis nesutampa"
    }


  }

}
