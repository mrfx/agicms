import { Injectable } from '@angular/core';
import {BackendService} from './backend.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {

  public logged: Subject<boolean> = new Subject<boolean>();
  public admin: any;

  constructor( private backendservice: BackendService ) {

    this.logged.next( false );

  }

  public checkLogged(): void {

    this.backendservice.authCheck().then( res => {

      if ( res.logged === 'ok' ) {

        this.logged.next(true);
        return true;

      } else {

        this.logged.next(false);
        return false;

      }

    } );

  }


  async login ( login: string, pass: string ): Promise<string> {

    const result = await this.backendservice.login( login, pass ).then( res => {

      if ( res.logged === 'ok') {

        this.logged.next(true);
        this.admin = res.user;

      }

      return res.logged;

    } );

    return result;

  }


  public logout (): void {

    this.backendservice.logout().then( res => {

      if ( res.logged === 'no' ) {

        this.logged.next(false);
        this.admin = [];

      }

    });

  }


}













