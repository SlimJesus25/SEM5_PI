import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() username: string = '';
  @Input() password: string = '';
  constructor(private router: Router) { }

  submit() {
    switch (this.username) {
      case 'admin': {
        this.openAdmin();
        break;
      }
      case 'campus': {
        this.openCampus();
        break;
      }
      case 'fleet': {
        this.openFleet();
        break;
      }
      default: {
        console.log('Invalid username');
        break;
      }
    }
  }

  openAdmin(){
    if (this.password != 'admin1234'){
      console.error('Invalid password');
    }else {
      this.router.navigate(['/admin']);
    }
  }

  openCampus(){
    if (this.password != 'campus1234'){
      console.error('Invalid password');
    }else {
      this.router.navigate(['/gestor-Campus']);
    }
  }

  openFleet(){
    if (this.password != 'fleet1234'){
      console.error('Invalid password');
    }else {
      this.router.navigate(['/gestor-Frota']);
    }
  }
}
