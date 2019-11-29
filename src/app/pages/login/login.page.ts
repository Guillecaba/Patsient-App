import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username:string;
  public returnURL;
  constructor(public authService: AuthService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  login_directo(){
    localStorage.setItem('logged', 'true');
    if (this.returnURL == null) {
      this.router.navigate(['pacientes']);
  } else {
      this.router.navigate([this.returnURL]);
  }
  }

  login() {
    this.authService.login(this.username).subscribe(res => {
        const coincidencias = res['totalDatos'];
        if (coincidencias > 0) {
            localStorage.setItem('logged', 'true');
            localStorage.setItem('currentUser', res['lista'][0].nombreCompleto);

            if (this.returnURL == null) {
                this.router.navigate(['pacientes']);
            } else {
                this.router.navigate([this.returnURL]);
            }
        } else {
           
          console.log('No hubo concidencias')
        }
    });
}

}
