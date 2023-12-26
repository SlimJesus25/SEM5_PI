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

  signup(){
    
  }

  submit(){
    if (this.password != 'teste1234'){
      console.error('Invalid password');
    }else {
      this.router.navigate(['/mainMenu']);
    }
  }
}

  /*submit() {
    switch (this.username) {
      case 'asist': {
        this.openAsist();
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
      case 'task': {
        this.openTask();
        break;
      }
      case 'info': {
        this.openInfo();
        break;
      }

      case 'vis': {
        this.openVis();
        break;
      }
      default: {
        console.log('Invalid username');
        break;
      }
    }
  }

  openVis(){
    if (this.password != 'vis1234'){
      console.error('Invalid password');
    }else {
      this.router.navigate(['/admin']);
    }
  }

  openAsist(){
    if (this.password != 'asist1234'){
      console.error('Invalid password');
    }else {
      this.router.navigate(['/asist']);
    }
  }

  openTask(){
    if (this.password != 'task1234'){
      console.error('Invalid password');
    }else {
      this.router.navigate(['/admin']);
    }
  }

  openInfo(){
    if (this.password != 'info1234'){
      console.error('Invalid password');
    }else {
      this.router.navigate(['/info']);
    }
  }

  openCampus(){
    if (this.password != 'campus1234'){
      console.error('Invalid password');
    }else {
      this.router.navigate(['/mainMenu']);
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
*/
