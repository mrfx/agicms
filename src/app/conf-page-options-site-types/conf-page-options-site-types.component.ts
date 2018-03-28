import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-conf-page-options-site-types',
  templateUrl: './conf-page-options-site-types.component.html',
  styleUrls: ['./conf-page-options-site-types.component.scss']
})
export class ConfPageOptionsSiteTypesComponent implements OnInit {

  public siteTypes: any;
  public pageTypes: any
  public pageTypesArray: any[] = [];
  public loaded: number;
  public newOption: {
    type: any,
    name: string,
    jsonData: string
  } = { type: '', name: '', jsonData: '' }

  constructor( private backendService: BackendService ) { }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  ngOnInit() {

    this.loaded = 0;
    this.backendService.loadTable('pageOptionsSiteTypes',
      'false', 'id', '0').then( res => {

      // console.info('res1', res);
        if ( res !== false ) {
          this.loaded++;
          this.siteTypes = res;
        }

    });
    this.backendService.loadTable('pageOptionsTypes',
      'false', 'id', '1').then( res => {

        // console.info('res2', res);

        if ( res !== false ) {
          this.loaded++;
          this.pageTypes = res;

          for (const property in res) {
            if (res.hasOwnProperty(property)) {
              this.pageTypesArray.push( res[property] );
            }
          }
          // console.info('tt', this.pageTypesArray);

        }

    });

  }


  updateOption(item: any): void {

    const fields = [ 'name', 'pageOptionsType', 'allowedValuesJSON' ];
    const where = ' id = ' + item.id + ' ';
    const values = [ item.name, item.pageOptionsType, item.allowedValuesJSON ];

    this.backendService.updateTableRow('pageOptionsSiteTypes', where, fields, values );

  }













}










