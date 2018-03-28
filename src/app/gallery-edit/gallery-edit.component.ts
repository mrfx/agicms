import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.scss']
})
export class GalleryEditComponent implements OnInit {

  public gallery: any;
  public galleryFiles: any[];
  public id: any;
  public loaded = false;
  public showAddFiles = false;

  constructor( private backendService: BackendService,
               private route: ActivatedRoute,
               private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.id = +this.route.snapshot.paramMap.get('id').toString();
    this._loadGallery();
  }

  private _loadGallery(): void {

    this.backendService.loadDataByID( this.id, 'loadGallery' ).then( res => {

      for (const i in res.files) {

        if (res.files.hasOwnProperty(i)) {

          res.files[i].filenameShow = this.sanitizer.bypassSecurityTrustStyle( 'url("' + res.files[i].filename + '") ' );

        }

      }

      this.gallery = res;
      this.galleryFiles = res.files;
      this.loaded = true;

      // console.info('res', res);

    });

  }

  toggleShowAddFiles(): void {

    this.showAddFiles = !this.showAddFiles;

  }

  fileChoosed(e): void {

    // console.info('fe', e);
    this.showAddFiles = false;

    if ( e.fileicon === 'file-image-o' ) {

      const url = this.sanitizer.bypassSecurityTrustStyle( 'url("' + e.filename + '") ' );
      const ff = {

        'filename': e.filename,
        'fileTitle' : '',
        'filenameShow': url

      };
      this.galleryFiles.push( ff );

    }

  }

  saveGallery(): void {

    const where = 'id = ' + this.id;
    const fields = ['titleCMS', 'filesJSON'];
    const values = [ this.gallery.titleCMS, JSON.stringify(this.galleryFiles) ];
    this.gallery.files = this.galleryFiles;
    this.backendService.updateTableRow('gallery', where, fields, values ).then( res => {

      this._loadGallery();

    });


  }






}






















