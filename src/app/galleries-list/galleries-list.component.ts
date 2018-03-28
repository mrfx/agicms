import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-galleries-list',
  templateUrl: './galleries-list.component.html',
  styleUrls: ['./galleries-list.component.scss']
})
export class GalleriesListComponent implements OnInit {

  public gallery: any[] = [];
  public showAddGallery: boolean;

  constructor( private backendService: BackendService ) { }

  ngOnInit() {

    this.showAddGallery = false;
    this._loadGallery();

  }


  createGallery( name: string ): void {

    // console.info ('name: ', name);

    const rank = (this.gallery.length + 1).toString();
    const fields = [ 'rank', 'titleCMS', 'filesJSON' ];
    const values = [ rank, name, '' ];
    this.backendService.addRow('gallery', fields, values, true ). then( res => {

      this._loadGallery();

    });

  }

  deleteGallery( idx ): void {

    let wheref = ['galleryID'];
    let vals = [ idx ];
    this.backendService.deleteMultipleRows('gallery2page', wheref, vals).then( res => {

      wheref = ['id'];
      vals = [ idx ];
      this.backendService.deleteMultipleRows('gallery', wheref, vals).then( resb => {

        this._loadGallery();

      });

    });

  }

  private _loadGallery(): void {

    this.backendService.loadDataByID('0', 'loadGalleries').then( res => {

      this.gallery = res;
      // console.info('gallery', this.gallery);
      this.showAddGallery = false;

    });

  }

  toggleShowAddGallery() {

    this.showAddGallery = !this.showAddGallery;

  }



}
