import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '@core/data/role';

@Injectable({ providedIn: 'root' })

export class ActiveGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isActivated = this.authenticationService.currentUserValue.active;
    if (isActivated) {
      return true;
    }

    // if (Role['super_admin'].includes(this.authenticationService.getUserRole()))
    //   this.router.navigate(['admin/dashboard'], { queryParams: { returnUrl: state.url } });
    // else if (Role['org_admin'].includes(this.authenticationService.getUserRole()))
    //   this.router.navigate(['organization/dashboard'], { queryParams: { returnUrl: state.url } });
    // else if (Role['project_admin'].includes(this.authenticationService.getUserRole()))
    //   this.router.navigate(['project_admin/dashboard'], { queryParams: { returnUrl: state.url } });
    // else if (Role['guest'].includes(this.authenticationService.getUserRole()))
    //   this.router.navigate(['guest/dashboard'], { queryParams: { returnUrl: state.url } });
    // else if (Role['staff'].includes(this.authenticationService.getUserRole()))
    //   this.router.navigate(['staff/dashboard'], { queryParams: { returnUrl: state.url } });

      
    return false;
  }

}
