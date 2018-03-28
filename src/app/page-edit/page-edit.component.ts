import {Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';


import { BackendService } from '../backend.service';




@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})

export class PageEditComponent implements AfterViewInit, OnInit {

  @ViewChild('ckeditor') ckeditor: any;

  public page: any;
  public id: any;
  public loaded: boolean;
  public options: any[];
  public pageOptions: any[] = [];
  public optionsKeys: any = {};

  public gallery: any[] = [];
  public galleryKeys: any = {};
  public galleryKeysLoaded = false;
  public pageGalleries: any[] = [];

  public showFiles = false;
  public selectedOptionForImage: any;

  ckeditorContent = '<p>Some html</p>';


  constructor( private backendService: BackendService,
               private route: ActivatedRoute,
               private sanitizer: DomSanitizer
  ) {

    route.params.subscribe(val => this.initialize());

  }

  ngAfterViewInit() {

  }

  initialize () {

    // console.log('init');
    this.loaded = false;
    this._loadData();
    this.page = { 'options': [] };
    this.optionsKeys = {};


  }

  ngOnInit() {

    // console.info ('hi page');
    this.showFiles = false;

  }


  onChange(event): void {}
  onEditorChange(event): void {}
  onReady(event): void {

    // console.info('ck', this.ckeditor);



  }
  onFocus(event): void {}
  onBlur(event): void {



  }
  onContentDom(event): void {}
  onFileUploadRequest(event): void {}








  fileChoosed(e): void {

    // console.info('fe', e);
    this.showFiles = false;

    if ( e.fileicon === 'file-image-o' ) {

      const url = this.sanitizer.bypassSecurityTrustStyle( 'url("' + e.filename + '") ' );
      const ff = {

        'filename': e.filename,
        'fileTitle' : '',
        'filenameShow': url

      };

      this.selectedOptionForImage.value = e.filename;
      this.updateField( this.selectedOptionForImage );


    }

  }


  selectImage (item: any): void {

    this.selectedOptionForImage = item;
    this.showFiles = !this.showFiles;

  }



  addGallery(galleryID): void {

    const rank = this.pageGalleries.length + 1;
    const fields = [ 'galleryID', 'pagesID', 'rank', 'title' ];
    const vals = [ galleryID, this.id, rank, '' ];
    this.backendService.addRow('gallery2page', fields, vals, true).then( res => {

      this._loadData();

    });

  }

  removeGallery (item): void {


    const whereFields = [ 'id' ];
    const whereValues = [ item.id ];

    this.backendService.deleteMultipleRows( 'gallery2page', whereFields, whereValues  ).then( res => {

      this._loadData();

    });

  }





  updateGallery(): void {

    const whereFields = [ 'id' ];
    // console.info('update', this.pageGalleries);

    for (const i in this.pageGalleries) {
      if (this.pageGalleries.hasOwnProperty(i)) {
        this.pageGalleries[i].rank = i;
      }
    }

    this.backendService.updateMultipleRows('gallery2page', whereFields, this.pageGalleries );

  }


  save(event): void {

    this.ckeditor.instance.insertText('zzzz');

  }

  addOption ( i ): void {

    const fields = ['pageID', 'category2optionsID', 'rank', 'value'];
    const vals = [ this.id, this.options[i].id, this.pageOptions.length + 1, ''];
    this.backendService.addRow('pageOptions', fields, vals, true).then( res => {

      this._loadData();

    });

  }

  changeOrder (): void {

    const rows = [];
    let a = 0;
    for ( const p in this.page.options ) {

      if ( this.page.options.hasOwnProperty( p ) ) {

        a++;
        const ro = {
          'rank': a,
          'id': this.page.options[ p ].id
        };
        rows.push( ro );

      }

    }


    this.backendService.addUpdateMultipleRowsByID('pageOptions', rows );


  }

  removeOption( item ): void {

    // console.info('ro', item );

    const whereFields = [ 'id' ];
    const whereValues = [ item.id ];

    this.backendService.deleteMultipleRows( 'pageOptions', whereFields, whereValues  ).then( res => {

      this._loadData();

    });

  }

  updatePage(): void {

    const where = 'id = ' + this.id;
    const fields = [ 'titleCMS', 'title' ];
    const vals = [ this.page.titleCMS, this.page.title ];
    this.backendService.updateTableRow('pages', where, fields, vals).then( res => {
      // x
    });

  }


  updateField(item: any): void {

    // console.info ('item', item);
    const where = 'id = ' + item.id;
    const fields = [ 'value' ];
    const vals = [ item.value ];
    this.backendService.updateTableRow('pageOptions', where, fields, vals).then( res => {
      // x
    });

  }





  private _loadData (): void {

    this.galleryKeysLoaded = false;
    this.options = [];
    this.optionsKeys = {};

    this.backendService.loadTable( 'gallery', '1=1', 'rank', '0' ).then( res => {

      this.gallery = res;
      for (const i in res) {
        if (res.hasOwnProperty(i)) {

          this.galleryKeys[ res[i].id ] = res[i];

        }
      }

      this.galleryKeysLoaded = true;

    });

    this.id = +this.route.snapshot.paramMap.get('id').toString();
    this.backendService.loadDataByID( this.id, 'loadPage' ).then( res => {

      if ( res.page[0].options === false ) { res.page[0].options = []; }
      this.page = res.page[0];

      if ( res.page[0].galleries === false ) {  res.page[0].galleries = []; }

      this.pageGalleries = res.page[0].galleries;


      for ( const i in res.options ) {

        if ( res.options.hasOwnProperty(i) ) {

          if ( res.options[i].pagesCategoryID === this.page.categoryID ) {

            this.options.push( res.options[i] );

            this.optionsKeys[ res.options[i].id ] = res.options[i];

          }

        }

      }

      this.loaded = true;


      // console.info ('res loaded', res, this.optionsKeys );
    });

  }

}























