import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class BackendService {

  private domenyPostUrl = '/srv/';
  public serverUrl = '/';
  public CMSoptions: any = {};

  constructor( private http: HttpClient ) {

  }

  public loadOptions(): void {

    this.loadTable('CMSoptions', '1=1', 'name', '1', 'name').then( res => {

      this.CMSoptions = res;
      if ( this.CMSoptions.hasOwnProperty('serverURL') ) {

        this.serverUrl = this.CMSoptions.serverURL.value;
        // console.info('surl', this.serverUrl.value);

      }

    });

  }


  async loadPages(id: number): Promise<any> {

    const idc = id.toString();

    const answer = await this.http.get<any>(this.domenyPostUrl,
      {params: new HttpParams()
          .set('sh', 'loadPages')
          .append('id', <string>idc )})
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }



  async loadCategories(id: number): Promise<any> {

    const idc = id.toString();

    const answer = await this.http.get<any>(this.domenyPostUrl,
      {params: new HttpParams()
          .set('sh', 'loadCategories')
          .append('id', <string>idc )})
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }




  async authCheck(): Promise<any> {

    const answer = await this.http.get<any>(this.domenyPostUrl,
      {params: new HttpParams()
          .set('sh', 'dunno')})
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }






  async login(login: string, pass: string): Promise<any> {

    const answer = await this.http.get<any>(this.domenyPostUrl,
      {params: new HttpParams()
          .set('sh', 'login')
          .append('login', login)
          .append('pass', pass)
      })
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }


  async logout(): Promise<any> {

    const answer = await this.http.get<any>(this.domenyPostUrl,
      {params: new HttpParams()
          .set('sh', 'logout')
      })
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }



  async loadDataByID( id: any, sh: any ): Promise<any> {

    const answer = await this.http.get<any>(this.domenyPostUrl,
      {params: new HttpParams()
          .set('sh', sh)
          .append('id', id )})
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }



  async createDir( dir: any ): Promise<any> {

    const answer = await this.http.get<any>(this.domenyPostUrl,
      {params: new HttpParams()
          .set('sh', 'createDir')
          .append('dir', dir )})
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }





  async deleteDir( dir: any ): Promise<any> {

    const answer = await this.http.get<any>(this.domenyPostUrl,
      {params: new HttpParams()
          .set('sh', 'deleteDir')
          .append('dir', dir )})
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }







  async createThumbnail( tfile: any ): Promise<any> {

    const answer = await this.http.get<any>(this.domenyPostUrl,
      {params: new HttpParams()
          .set('sh', 'createThumbnail')
          .append('tfile', tfile )})
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }








  async loadTable( table: string,
                   where: string,
                   order: string,
                   indexType: string = '0',
                   indexField: string = 'id'

  ): Promise<any> {

    const answer = await this.http.get<any>(this.domenyPostUrl,
      {params: new HttpParams()
          .set('sh', 'loadTableRows')
          .append('table', table )
          .append('where', where )
          .append('order', order )
          .append('indexType', indexType )
          .append('indexField', indexField )
      })
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }


  async updateTableRow( table: string,
                   where: string,
                   fields: string[],
                   values: string[]

  ): Promise<any> {

    const postData = {
      sh: 'updateTableRow',
      where: where,
      fields: fields,
      values: values,
      table: table
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const answer = await this.http.post<any>(this.domenyPostUrl, postData, httpOptions)
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;

  }




  async updateMultipleRows (
    table: string,
    whereFields: string[],
    rows: any[]
  ): Promise<any> {

    const postData = {
      sh: 'updateMultipleRows',
      whereFields: whereFields,
      rows: rows,
      table: table
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const answer = await this.http.post<any>(this.domenyPostUrl, postData, httpOptions)
      .toPromise().then( wynik => {

        // console.info( 'wynik', wynik );
        return wynik;

      });

    return answer;

  }






  async addRow( table: string, fields: string[], values: string[], addID: boolean ): Promise<any> {

    const postData = {
      sh: 'addTableRow',
      fields: fields,
      values: values,
      table: table,
      addID: addID
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const answer = await this.http.post<any>(this.domenyPostUrl, postData, httpOptions)
      .toPromise().then( wynik => {

        return wynik;

      });

    return answer;


  }





  async addMultipleRows (
    table: string,
    rows: any[],
    addID: boolean
  ): Promise<any> {

    const postData = {
      sh: 'addMultipleRows',
      addID: addID,
      rows: rows,
      table: table
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const answer = await this.http.post<any>(this.domenyPostUrl, postData, httpOptions)
      .toPromise().then( wynik => {

        // console.info( 'wynik', wynik );
        return wynik;

      });

    return answer;

  }






  async deleteMultipleRows (
    table: string,
    whereFields: string[],
    whereValues: string[]
  ): Promise<any> {

    const postData = {
      sh: 'deleteMultipleRows',
      whereFields: whereFields,
      whereValues: whereValues,
      table: table
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const answer = await this.http.post<any>(this.domenyPostUrl, postData, httpOptions)
      .toPromise().then( wynik => {

        // console.info( 'wynik', wynik );
        return wynik;

      });

    return answer;

  }






  async addUpdateDeleteMultipleRowsByID (
    table: string,
    rows: any[],
    limitDelete: any[] = []
  ): Promise<any> {

    const postData = {
      sh: 'addUpdateDeleteMultipleRowsByID',
      rows: rows,
      table: table,
      limitDelete: limitDelete
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const answer = await this.http.post<any>(this.domenyPostUrl, postData, httpOptions)
      .toPromise().then( wynik => {

        // console.info( 'wynik', wynik );
        return wynik;

      });

    return answer;

  }






  async addUpdateMultipleRowsByID (
    table: string,
    rows: any[]
  ): Promise<any> {

    const postData = {
      sh: 'addUpdateMultipleRowsByID',
      rows: rows,
      table: table
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const answer = await this.http.post<any>(this.domenyPostUrl, postData, httpOptions)
      .toPromise().then( wynik => {

        // console.info( 'wynik', wynik );
        return wynik;

      });

    return answer;

  }











  async saveMenusStructures (
    menu: any
  ): Promise<any> {

    const postData = {
      sh: 'saveMenusStructures',
      menu: menu
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const answer = await this.http.post<any>(this.domenyPostUrl, postData, httpOptions)
      .toPromise().then( wynik => {

        // console.info( 'wynik', wynik );
        return wynik;

      });

    return answer;

  }










  async deleteFiles (
    files: any[],
    dir: string
  ): Promise<any> {

    const postData = {
      sh: 'deleteFiles',
      files: files,
      dir: dir
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const answer = await this.http.post<any>(this.domenyPostUrl, postData, httpOptions)
      .toPromise().then( wynik => {

        // console.info( 'wynik', wynik );
        return wynik;

      });

    return answer;

  }






  async changeImages (
    files: any[],
    dir: string,
    changeType: string,
    params: any[]
  ): Promise<any> {

    const postData = {
      sh: 'image-change',
      files: files,
      dir: dir,
      changeType: changeType,
      params: params
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const answer = await this.http.post<any>(this.domenyPostUrl, postData, httpOptions)
      .toPromise().then( wynik => {

        // console.info( 'wynik', wynik );
        return wynik;

      });

    return answer;

  }











}
