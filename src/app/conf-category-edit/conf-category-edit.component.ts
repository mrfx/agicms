import {Component, OnInit, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';



import { BackendService } from '../backend.service';


@Component({
  selector: 'app-conf-category-edit',
  templateUrl: './conf-category-edit.component.html',
  styleUrls: ['./conf-category-edit.component.scss']
})
export class ConfCategoryEditComponent implements OnInit, OnChanges {

  public id: any;
  public category: any;
  public categoryOptions: any;
  public categoryTypes: Array<any> = [];
  public newOptionName: string;
  public newOptionType: string;
  public saveRows: Array<any>;

  public modalRef: BsModalRef;
  public modalTitle: string;
  public modalMessage: any;
  public modalItem: any;
  modalConfirmed: boolean;
  modalType: string;
  modalID: number;
  @ViewChild('templateModal') private tmplModal: TemplateRef<any>;

  @Input() categoryId: any;

  ngOnChanges(changes: SimpleChanges) {

    this.id = this.categoryId;
    this.loadCategory();

  }

  constructor( private backendService: BackendService,
               private modalService: BsModalService,
               private router: Router,
               private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.category = false;
    this.modalMessage = '';
    this.modalTitle = '';
    this.modalConfirmed = false;
    this.modalItem = {};
  }



  loadCategory(): void {

    this.backendService.loadDataByID( this.id, 'loadCategory' ).then( res => {

      this.category = res.category;
      this.categoryOptions = res.categoryOptions;

      this.categoryTypes = [];
      for ( const i in res.types ) {
        if ( res.types.hasOwnProperty(i) ) {

          this.categoryTypes.push(res.types[i]);

        }
      }

      this.newOptionName = '';

      // console.info('ctypes', this.categoryTypes );
      console.info('coptions', this.categoryOptions );

    });

  }


  addOption(): void {

    // console.info ( 'click add' );
    const rank = this.categoryOptions.length + 1;
    const f = ['name', 'rank', 'pagesCategoryID', 'pageOptionsSiteTypesID'];
    const v = [ this.newOptionName, rank, this.id, this.newOptionType ];

    // console.info('v', v);


    this.backendService.addRow('category2options', f, v, true).then(
      res => {

        console.info ('res add', res);
        this.loadCategory();

      }
    );


  }





  updateOption(): void {



  }



  changeOrder(): void {

  }

  saveCategory(): void {

    this.saveRows = [];

    for (const i in this.categoryOptions) {

      if (this.categoryOptions.hasOwnProperty(i)) {

        this.categoryOptions[i].rank = Number(i) + 1;

        const z = {

          'pagesCategoryID': this.id,
          'pageOptionsSiteTypesID': this.categoryOptions[i].pageOptionsSiteTypesID,
          'name': this.categoryOptions[i].name,
          'listVisible': this.categoryOptions[i].listVisible,
          'rank': this.categoryOptions[i].rank

        };

        this.saveRows.push(z);

      }

    }

    // console.info('coptions', this.categoryOptions );

    const where = ' `id` = ' + this.id;
    const fields = [ 'name', 'color', 'sortBy', 'titleListVisible' ];
    const values = [
      this.category.name,
      this.category.color,
      this.category.sortBy,
      this.category.titleListVisible
    ];

    this.backendService.updateTableRow('pagesCategory', where, fields, values );

    const limitDelete = [ { 'pagesCategoryID':  this.id } ];

    this.backendService.addUpdateDeleteMultipleRowsByID('category2options', this.categoryOptions, limitDelete)
      .then( res => {

      // console.info('saved res', res);

    });

  }


  removeCategoryItem( index ): void {

    // console.info('ind', index);
    const where = ' `category2optionsID` = "' + this.categoryOptions[index].id + '" ';
    this.backendService.loadTable('pageOptions', where, 'id', 'id'). then(res => {

      // this.categoryOptions.splice(index, 1);
      console.info('del result', res );

      if ( res === false ) {

        console.info('del result', res );

      } else {

        const item = { 'res': res, 'index': index };
        this.openModal('removeCategoryItem', item );

      }


    });


  }












  openModal(typ: string, item: any): void {

    this.modalType = typ;
    this.modalItem = item;


    if (typ === 'removeCategoryItem') {

      this.modalMessage = '';
      this.modalTitle = 'Parametr używany na stronach:';

      console.info('item', item);

      let msg = ''

      for ( const i in item.res ) {

        if ( item.res.hasOwnProperty(i) ) {

          msg += '<span style="cursor: pointer" data-route="/page-edit/' + item.res[i].pageID + '">ID strony: ' + item.res[i].pageID + '</span>' + '<br>';

        }

      }

      this.modalMessage = this.sanitizer.bypassSecurityTrustHtml( msg );

    }

    this.modalRef = this.modalService.show( this.tmplModal );

  }



  modalConfirm(): void {

    this.modalConfirmed = true;
    this.modalRef.hide();

    if ( this.modalType === 'subdomain-delete' ) {



    }

    this.modalID = 0;
    this.modalType = '';

  }

  modalDecline(): void {

    this.modalID = 0;
    this.modalType = '';

    this.modalConfirmed = false;
    this.modalRef.hide();
  }


  modalRouteClick(event: any) {
    this.modalRef.hide();
    console.log('fire', event.target.dataset.route);
    this.router.navigate( [ event.target.dataset.route ] );
  }












}















