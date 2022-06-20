import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { EncrDecrService } from 'src/app/services/EncrDecrService';
import { IUser } from 'src/model/IUser';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { TrustyService } from '../../../core/services/trusty.service';
import { TrustyCreateUser } from '../../../core/types/trusty.types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register: IUser = new IUser();
  confirmPass: string = '';

  constructor(
    private service: ApiService,
    private route: Router,
    private EncrDecr: EncrDecrService,
    private trustyService: TrustyService
  ) {}

  ngOnInit(): void {}

  registerUser() {
    let user: IUser = this.register!;

    if (user.name.replace(/\s/g, '').length == 0) {
      this.displayStatus('Įrašykite savo vardą');
      return;
    }
    if (user.lastname.replace(/\s/g, '').length == 0) {
      this.displayStatus('Įrašykite savo pavardę');
      return;
    }
    if (user.email.replace(/\s/g, '').length == 0) {
      this.displayStatus('Įrašykite savo el. pašto adresą');
      return;
    }
    if (user.login.replace(/\s/g, '').length == 0) {
      this.displayStatus('Įrašykite savo prisijungimo vardą');
      return;
    }
    if (user.password.replace(/\s/g, '').length == 0) {
      this.displayStatus('Įrašykite savo prisijungomi slaptažodį');
      return;
    }
    if (user.password != this.confirmPass) {
      this.displayStatus('Slaptažodis nesutapo. Bandykite dar kartą');
      return;
    } else {
      user.type = 'user';

      const trustyRequest: TrustyCreateUser = {
        firstName: user.name,
        lastName: user.lastname,
        email: user.email,
        phone: user.phone,
        password: user.password,
        username: user.login,
        productId: environment.productId,
      };
      this.trustyService.register(trustyRequest).subscribe({
        next: (response) => {
          user.id = response.id;

          user.password = this.EncrDecr.set('123456$#@$^@1ERF', user.password);
          var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', user.password);

          this.service.addUser(user).subscribe({
            next: (data) => {
              this.route.navigate(['/login']).then(() => {
                window.location.reload();
              });
            },
            error: (error) => {
              this.displayStatus('Kažkodėl nepavyko sukurti vartotojo');
              console.log(error);
            },
          });
        },
        error: (error) => {
          this.displayStatus('Kažkodėl nepavyko sukurti vartotojo');
          console.log(error);
        },
      });
    }
  }

  displayStatus(text: string) {
    Swal.fire({
      icon: 'error',
      title: '',
      text: text,
    });
  }
}
