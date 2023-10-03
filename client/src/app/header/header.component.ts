import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  onLogout(){
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.router.navigate(['/login']);
      location.reload();
      location.reload();
    });
  }

  isSessionActive(): boolean {
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

}
