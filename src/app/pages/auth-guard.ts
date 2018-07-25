import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        console.log(sessionStorage.getItem('use_id'));
        if (sessionStorage.getItem('use_id') !== null) {
            return true;
        } else {
            this.router.navigate(['pages/login']);
            return false;
        }
    }
}
