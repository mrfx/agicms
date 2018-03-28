import { Component, OnInit } from '@angular/core';
import { toPromise } from 'rxjs/operator/toPromise';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-structure-menu',
  templateUrl: './structure-menu.component.html',
  styleUrls: ['./structure-menu.component.scss']
})
export class StructureMenuComponent implements OnInit {

  public categories: any[] = [];
  public categoriesArr: any[] = [];
  public pagesArr: any[] = [];
  public menusArr: any[] = [];
  public t2temp: any[] = [];
  public maxRemoveID: Number = 0;
  public templates: any;
  public fullscreenTree: boolean;
  public treeClass: string;


  public selectedCat = 0;

  constructor( private backendService: BackendService ) { }

  ngOnInit() {

    this.fullscreenTree = false;
    this.treeClass = 'col-md-6';
    this._loadt2t().then( res => {

    });

  }





  private catAddChildren( a: any, cat: any, level: number, ist2t = 0 ): any {

    a.children = [];
    a.level  = level;
    level++;
    for (const i in cat) {

      if ( cat.hasOwnProperty(i) ) {

        if ( cat[i].parentID === a.id ) {

          if ( ist2t === 0 ) {

            this.categoriesArr.push( cat[i] );

          }

          cat[i] = this.catAddChildren(cat[i], cat, level, ist2t);
          a.children.push( cat[i] );


        }

      }

    }

    return a;

  }


  private async _loadt2t(): Promise<string> {

    const a = await this.backendService.loadDataByID('0', 'loadt2t').then( res => {

      // console.info ('res', res);

      this.templates = res.tmpl;

      this.categories = [];
      this.categoriesArr = [];
      for (const i in res.cat) {

        if (res.cat.hasOwnProperty(i)) {

          if (res.cat[i].parentID === '1') {

            res.cat[i] = this.catAddChildren(res.cat[i], res.cat, 1, 0);
            this.categoriesArr.push( res.cat[i] );
            this.categories.push(res.cat[i]);
          }

        }

      }

      this.t2temp = [];


      for (const  i in res.t2t) {

        if (res.t2t.hasOwnProperty(i)) {

          res.t2t[i].parentID = res.t2t[i].parent_t2t;
          if (res.t2t[i].enabled === '0') {
            res.t2t[i].enabled = false;
          }
          if (res.t2t[i].showNested === '0') {
            res.t2t[i].showNested = false;
          }

          res.t2t[i].removeID = i;

        }

      }

      this.maxRemoveID = res.t2t.length + 1;

      for (const i in res.t2t) {

        if (res.t2t.hasOwnProperty(i)) {

          if (res.t2t[i].parentID === '1') {

            res.t2t[i] = this.catAddChildren( res.t2t[i], res.t2t, 1, 1 );
            this.t2temp.push( res.t2t[i] );

          }

        }

      }


      // console.info ('t', this.t2temp);

      this.menusArr = this.t2temp;

      return true;

    });


    return 'ok';


  }

  private async _loadPages(catID: any): Promise<string> {

    const where = ' categoryID = ' + catID;
    const a = await this.backendService.loadTable('pages', where, 'rank',  '0').then( res => {

      this.pagesArr = [];

      for ( const i in res ) {

        if (res.hasOwnProperty(i)) {

          this.pagesArr.push({
            'showNested' : false,
            'templatesID' : this.templates[0].id,
            'url' : '',
            'enabled' : true,
            'titleCMS': res[i].titleCMS,
            'pageID': res[i].id,
            'children': []

        });

        }

      }

      // this.pagesArr = res;
      // console.info ('pages', this.pagesArr);

    });
    return 'ok';

  }



  catClick(item): void {

    this.selectedCat = item.id;
    this._loadPages( this.selectedCat ).then( res => {

    });

  }



  tooggleFullscreen(): void {

    this.fullscreenTree = !this.fullscreenTree;
    if ( this.fullscreenTree === false ) {
      this.treeClass = 'col-md-6';
    } else {
      this.treeClass = 'col-md-12';
    }

  }












  private _updateNestedOrderChildren( obj: any): void {

  }

  updateNestedOrder(): void {

    console.info('menu', this.menusArr );

    this.backendService.saveMenusStructures( this.menusArr ).then( res => {

      // console.info('saved', res);
      this._loadt2t();

    });


  }


  toggleNested ( item ): void {

    if ( item.showNested === false ) {
      item.showNested = true;
    } else {
      item.showNested = false;
    }

    this.updateNestedOrder();

  }


  allowMoves ( e: any ): boolean {

    // console.info ('mm', e);

    const res = !Boolean(parseInt( e.lockedCMS, 10));

    return res;

  }


  changeCheckbox( item: any ): void {

    // item.enabled = !item.enabled;
    this.updateNestedOrder();
    // console.log(item.enabled);

  }

  removeItem(item): void {

    // console.info('item', item);
    this.menusArr = this._removeByValue( this.menusArr, 'removeID', item.removeID );
    // console.info('menuarr', this.menusArr);
    this.updateNestedOrder();

  }

  private _removeByValue( arr, field, value ) {

    for ( const i in arr ) {

      if ( arr.hasOwnProperty(i) ) {

        if ( arr[i].hasOwnProperty(field) ) {

          if ( arr[i][field] === value ) {

            // console.info('deleting', arr[i]);
            arr.splice(i, 1);

          } else if ( arr[i].hasOwnProperty('children') ) {

            // console.info('hmm', arr[i][field], value);
            this._removeByValue( arr[i].children, field, value );

          }

        }

      }

    }

    return arr;

  }




}






