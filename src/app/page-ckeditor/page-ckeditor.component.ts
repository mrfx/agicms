import {Component, OnInit, ViewChild, AfterViewInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BackendService } from '../backend.service';
import {APP_BASE_HREF} from '@angular/common';

@Component({
  selector: 'app-page-ckeditor',
  templateUrl: './page-ckeditor.component.html',
  styleUrls: ['./page-ckeditor.component.scss']
})
export class PageCkeditorComponent implements OnInit, AfterViewInit {

  @ViewChild('ckeditor') ckeditor: any;

  public ckeditorContent = '';
  public loadedContent = '';
  public id: any;
  public page: any;
  public loaded: boolean;
  public pageOptions: any;
  public categoryOptions: any = {};
  public pageSaved: boolean;

  public modalRef: BsModalRef;
  public modalTitle: string;
  public modalMessage: any;
  public modalItem: any;
  modalConfirmed: boolean;
  modalType: string;
  modalID: number;
  @ViewChild('templateModal') private tmplModal: TemplateRef<any>;


  constructor( private backendService: BackendService,
               private route: ActivatedRoute,
               private router: Router,
               private modalService: BsModalService
  ) { }

  ngAfterViewInit() {

  }

  ngOnInit() {



    this.pageSaved = false;
    // console.info ('ii', APP_BASE_HREF );
    this.id = +this.route.snapshot.paramMap.get('id').toString();
    this.loaded = false;
    this.categoryOptions.name = '';

    this._loadData();

  }


  private _loadData(): void {


    const where = ' id =  ' + this.id;
    this.backendService.loadTable('pageOptions', where, 'id', 'id'). then(res => {

      this.loadedContent = res[0].value;
      this.pageOptions = res[0];

      const whereb = ' id =  ' + res[0].pageID;
      this.backendService.loadTable('pages', whereb, 'id', 'id'). then(res => {

        this.page = res[0];

        const wherec = ' id =  ' + this.pageOptions.category2optionsID;
        this.backendService.loadTable('category2options', wherec, 'id', 'id'). then(res => {

          this.categoryOptions = res[0];
          this.loaded = true;

        });


      });



    });

  }




  onChange(event): void {}
  onEditorChange(event): void {}
  onReady(event): void {

    console.info('ck', this.ckeditor);
    this.ckeditor.config.allowedContent = true;

    this.ckeditor.instance.config.protectedSource.push( /<i[\s\S]*?\>/g ); //allows beginning <i> tag
    this.ckeditor.instance.config.protectedSource.push( /<\/i[\s\S]*?\>/g ); //allows ending </i> tag

    this.ckeditor.instance.insertHtml( this.loadedContent );

    // this.ckeditor.config.removePlugins = 'Save,Print,Preview,Find,About';
    // this.ckeditor.config.removeButtons = 'Save';




  }
  onFocus(event): void {}
  onBlur(event): void {



  }
  onContentDom(event): void {}
  onFileUploadRequest(event): void {}

  save(event): void {

    console.info ('event', event );

    const where = ' `id` = ' + this.id;
    const fields = [ 'value' ];
    const values = [
      this.ckeditorContent
    ];

    // this.loaded = false;
    this.pageSaved = true;

    this.backendService.updateTableRow('pageOptions', where, fields, values )
      .then( res => {

      this.pageSaved = true;
      // console.info('ps', this.pageSaved);
      setTimeout(() => {

        /*
        const rr = '/page-edit/' + this.pageOptions.pageID;
        this.router.navigateByUrl( rr ).then( () => {

          window.location.reload();

        });
        */

        this.pageSaved = false;
        // console.info('ps2', this.pageSaved);

      }, 3000);




      //
      // this.router.navigateByUrl('/');



    });


  }

  insertFileDialog(event): void {

    // this.ckeditor.instance.insertText('zzzz');
    this.openModal('file-list', '');

  }

  insertFile (event): void {

    // console.info ('ff: ', event);
    this.modalRef.hide();

    if ( event.fileicon === 'file-image-o' ) {

      const nn = '<img src="' + event.filename + '" style="width: 100px">';
      this.ckeditor.instance.insertHtml( nn );

    }

  }

















  openModal(typ: string, item: any): void {

    this.modalType = typ;
    this.modalItem = item;

    this.modalMessage = '';
    this.modalTitle = '';

    if ( typ === 'file-list' ) {

      this.modalTitle = 'Wybierz obrazek:';

    }

    this.modalRef = this.modalService.show( this.tmplModal, { 'class': 'agi-modal-wide' } );

  }



  modalConfirm(): void {

    this.modalConfirmed = true;
    this.modalRef.hide();

    this.modalID = 0;
    this.modalType = '';

  }

  modalDecline(): void {

    this.modalID = 0;
    this.modalType = '';

    this.modalConfirmed = false;
    this.modalRef.hide();
  }





}













