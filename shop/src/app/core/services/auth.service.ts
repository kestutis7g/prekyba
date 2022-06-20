import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenContent } from '../types/auth.types';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private accountService: AccountService) {
    this.isAuthenticated = this.getToken() != null;
  }

  public isAuthenticated: boolean = false;

  readonly usernameStorage: string = 'username';
  readonly userTypeStorage: string = 'type';
  readonly userIdStorage: string = 'userId';

  readonly tokenStorage: string = 'trusty-authentication';
  readonly loginRoute: string = '/login';

  public login(token: string) {
    localStorage.setItem(this.tokenStorage, token);
    // Čia reiktų API suhandlint visą tokeną ir pagal SID pasiimt user, bet tingiu :)
    const parsed = JSON.parse(atob(token.split('.')[1]));

    const userId = parsed[TokenContent.userId];

    this.accountService.getCurrentUser(userId).subscribe({
      next: (user) => {
        localStorage.setItem(this.usernameStorage, user.login);
        localStorage.setItem(this.userTypeStorage, user.type);
        localStorage.setItem(this.userIdStorage, user.id!.toString());

        window.location.reload();
      },
    });

    this.router.navigate(['/shop']);

    this.isAuthenticated = true;
  }

  public logout() {
    this.isAuthenticated = false;

    localStorage.removeItem(this.tokenStorage);

    this.accountService.discardDataOnLogOut();

    this.router.navigate([this.loginRoute]);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenStorage);
  }
}
