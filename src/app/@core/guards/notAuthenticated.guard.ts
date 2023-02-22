import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '@core/data/role';

@Injectable({ providedIn: 'root' })
export class NotAuthenticatedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser: any = this.authenticationService.currentUserValue;
    if (!currentUser) {
      return false;
    } else {

      // const userRole = currentUser.role;
      // if (Role['super_admin'].includes(userRole)) {
      //   this.router.navigate(['admin']);
      // } else if (Role['org_admin'].includes(userRole)) {
      //   this.router.navigate(['organization']);
      // } else if (Role['project_admin'].includes(userRole)) {
      //   this.router.navigate(['project-admin']);
      // } else if (Role['staff'].includes(userRole)) {
      //   this.router.navigate(['staff']);
      // } else if (Role['guest'].includes(userRole)) {
      //   this.router.navigate(['guest']);
      // }

      return true;
    }
  }
}
