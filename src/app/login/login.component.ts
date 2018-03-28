import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login: string;
  public pass: string;
  public wrongPass: boolean;

  constructor( private backendservice: BackendService,
               private authservice: AuthService
               ) { }

  ngOnInit() {

    this.wrongPass = false;

  }

  public loginClick(): void {

    this.authservice.login( this.login, this.pass ).then( val => {

      if ( val === 'no' ) {

        this.wrongPass = true;

      } else {

        this.backendservice.loadOptions();

      }

    });

  }

}
