import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../../../model/IUser';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  readonly API = environment.APIUrl;

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);

  public get currentUser(): Observable<IUser | null> {
    return this.currentUserSubject.asObservable();
  }

  // Čia turėtų būt API/user/current ir siūst tokeną per HTTP Headers ir pagal jį pasiimt
  public getCurrentUser(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.API}user/id/${userId}`).pipe(
      tap({
        next: (user) => {
          this.currentUserSubject.next(user);
        },
        error: () => {
          this.currentUserSubject.next(null);
        },
      })
    );
  }

  public discardDataOnLogOut(): void {
    this.discardCurrentUser();
  }

  private discardCurrentUser(): void {
    this.currentUserSubject.next(null);
  }
}
