import {Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { BackendService } from '../backend.service';

export  interface IcategoryPages {
  id: string;
  parentID: string;
  name: string;
  rank: string;
}


@Component({
  selector: 'app-conf-categories',
  templateUrl: './conf-categories.component.html',
  styleUrls: ['./conf-categories.component.scss']
})
export class ConfCategoriesComponent implements OnInit, AfterViewInit {

  public categories: Array<any> = [];
  public id: any = '0';
  public selectedCategoryID = '0';

  public nestedLists = [];

  public nestedListOrder = [];



  private _createChildren( i ): Array<any> {

    const  zz = i.subpages;
    const ret = [];
    for ( const ii in zz ) {

      if ( zz.hasOwnProperty(ii)  ) {

        const cat = {
          'id': zz[ii].id,
          'label': zz[ii].name,
          'rank': zz[ii].rank,
          'parentID': zz[ii].parentID,
          'children': [],
          'showNested': false
        };

        cat.children = this._createChildren( zz[ii] );

        ret.push( cat );

      }

    }

    return ret;

  }

  ngAfterViewInit() { }


  constructor( private backendService: BackendService ) { }

  ngOnInit() {

    this.id = '0';
    this.backendService.loadCategories(this.id).then( z => {

      this.categories = z;

      // console.info ( 'cat', this.categories );

      for ( const i in this.categories ) {

        if ( this.categories.hasOwnProperty(i) ) {

          const cat = {
            'id': this.categories[i].id,
            'label': this.categories[i].name,
            'rank': this.categories[i].rank,
            'parentID': this.categories[i].parentID,
            'children': [],
            'id2': i,
            'showNested': false
          };

          cat.children = this._createChildren( this.categories[i] );

          this.nestedLists.push(cat);

        }

      }

    });

  }

  private _updateNestedOrderChildren( obj: any): void {

    for ( const i in obj.children ) {

      if ( obj.children.hasOwnProperty(i) ) {

        const nlo = {
          'id': obj.children[i].id,
          'rank': Number(i) + 1,
          'parentID': obj.id
        };

        this.nestedListOrder.push( nlo );

        if ( obj.children[i].children.length > 0) {

          this._updateNestedOrderChildren( obj.children[i] );

        }

      }

    }

  }

  updateNestedOrder(): void {

    this.nestedListOrder = [];
    for ( const i in this.nestedLists ) {

      if ( this.nestedLists.hasOwnProperty(i)) {

        const nlo = {
          'id': this.nestedLists[i].id,
          'rank': Number(i) + 1,
          'parentID': this.nestedLists[i].parentID
        };

        this.nestedListOrder.push( nlo );

        if ( this.nestedLists[i].children.length > 0) {

          this._updateNestedOrderChildren( this.nestedLists[i] );

        }

      }

    }

    // console.info('uop', this.nestedListOrder);

    const whereFields = [ 'id' ];

    this.backendService.updateMultipleRows( 'pagesCategory', whereFields, this.nestedListOrder );

  }


  categoryClick( item ): void {

    // console.info ( 'click', item );
    this.selectedCategoryID = item.id;

  }

  toggleNested ( item ): void {

    if ( item.showNested === false ) {
      item.showNested = true;
    } else {
      item.showNested = false;
    }

  }


  setColor ( id ): string {

    let tcolor = '';
    if ( id === this.selectedCategoryID ) {

      tcolor = '#a8c8ff';

    } else {

      tcolor = '#efefef';

    }
    return tcolor;

  }













}
