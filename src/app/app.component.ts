import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';


import { AuthService } from './auth.service';
import { BackendService } from './backend.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

    public title = 'app';
    public logged: boolean;

    constructor ( private router: Router,
                  private authservice: AuthService,
                  private route: ActivatedRoute,
                  private backendService: BackendService
    ) {

      this.logged = false;
      authservice.logged.subscribe( val => {
        this.logged = val;
        this.backendService.loadOptions();
      });

      router.events.subscribe(event => {
        if (event instanceof NavigationStart) {

          // console.info('ccc', this.backendService.CMSoptions);
          if ( this.logged === true && !this.backendService.CMSoptions.hasOwnProperty('serverURL') ) {

            this.backendService.loadOptions();

          }


        }
      });

      // console.info ('logged', this.logged);
      authservice.checkLogged();

    }

    ngOnInit () {

     


      setInterval(() => {

        if (this.logged === true) {

          this.authservice.checkLogged();

        }

      }, 65000);


    }




}
