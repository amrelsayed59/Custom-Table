import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { Role } from '@core/data';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private currentUserSubject = new BehaviorSubject<any>(null);
  private user: any = {};
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(
    private globalService: GlobalService,
    private router: Router,
  ) {
    this.observeData();
  }

  observeData() {
    const authorizationData = JSON.parse(localStorage.getItem('AuthorizationData') || '');
    this.currentUserSubject.next(authorizationData);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(NewValue) {
    localStorage.setItem('AuthorizationData', JSON.stringify(NewValue));
    this.observeData();
  }

  // login(username: string, password: string) {
  //   return this.globalService.post(`login`, { username: username, password: password })
  //     .pipe(map(user => {
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('AuthorizationData', JSON.stringify(user.data));
  //       localStorage.setItem('satellizer_token', JSON.stringify(user.data.token));
  //       localStorage.setItem('organizationId', JSON.stringify(user.data.organizationId));
  //       this.currentUserSubject.next(user ? user.data : user);
  //       // this.pusherService.subscribeToChannel();
  //       return user;
  //     }));
  // }

  // logout() {
  //   // remove user from local storage to log user out
  //   this.globalService.post('logout').subscribe(res => {
  //     this.globalService.logout();
  //     this.currentUserSubject.next(null);
  //     localStorage.clear();
  //     this.router.navigate(['auth/login']);
  //   });
  // }

  isAuthorized(allowedRoles: string[]): boolean {
    this.currentUser.subscribe(x => this.user = x);
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    const currentRole = this.user.role;
    if (!currentRole) {
      console.log('Invalid token');
      return false;
    }
    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(currentRole);
  }

  getUserRole(): string {
    let role_name = '';
    if (this.currentUserValue) {
      const role: string = this.currentUserValue.role;
      Object.keys(Role).forEach((key: string) => {
        if (Role[key as keyof typeof Role].includes(role)) role_name = key;
      });
    }
    return role_name;
  }

}
