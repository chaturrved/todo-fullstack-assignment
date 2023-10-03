import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(
        private router: Router,
    ) {}

    canActivate(){
        if(localStorage.getItem('token')) {
            return true;
        }else{
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}

export const GuardsDown : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuard).canActivate();
};