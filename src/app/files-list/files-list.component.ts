import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


import { BackendService } from '../backend.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {

  public xfiles: any[] = [];
  public xdirs: any[] = [];
  public selectedfiles: any[] = [];
  public copiedfiles: any[] = [];
  public copiedDir: string;
  public actualDir: string;
  public loading = true;
  public clickedFile: any = '';
  public clickedImgFile: any = '';
  public clickedItem: any;
  public showUpload: boolean;
  public newDir = '';

  @Input() fromModal = false;
  @Input() fromGallery = false;
  @Input() fromCKE = false;

  @Output() fileChoosed = new EventEmitter<any>();

  constructor( private backendService: BackendService,
               private sanitizer: DomSanitizer ) { }

  ngOnInit() {

    this.showUpload = false;
    this.actualDir = '';
    this.copiedDir = '';
    this._loadDir();


  }

  uploaded(): void {

    this._loadDir();

  }

  dropToDir(ee): void {

    // console.info(ee);

  }



  toggleShowUpload(): void {

    if ( this.showUpload ) { this.showUpload = false; } else { this.showUpload = true; }

  }

  invertSelection(): void {

    for (const i in this.xfiles ) {
      if (this.xfiles.hasOwnProperty(i)) {
        this.xfiles[i].selected = !this.xfiles[i].selected;
      }
    }

    this.setselectedfiles();
  }


  chooseFile ( item ): void {

    const url = {
      'filename': this.backendService.serverUrl + '/userfiles/' + this.actualDir + item.filename,
      'fileicon': item.iconCss
    };

    this.fileChoosed.emit( url );

  }


  fileClick ( item ): void {

    // console.info ('file: ', item.filename );

    this.clickedFile = item.filename;
    this.clickedImgFile = '';
    this.clickedItem = item;

    if ( item.iconCss === 'file-image-o' ) {

      const img = 'background-image:url("' + this.backendService.serverUrl + '/userfiles/' + this.actualDir + item.filename + '")';
      this.clickedImgFile = this.sanitizer.bypassSecurityTrustStyle( img );
      // console.info ('file img: ', this.clickedImgFile );

    }

  }


  setDir( dir ): void {

    this.actualDir = dir + '/';
    this._loadDir();

  }

  setDirUp(): void {

    const da = this.actualDir.split('/');
    da.pop();
    da.pop();
    this.actualDir = '';
    for ( const i in da) {
      if (da.hasOwnProperty(i)) {
        this.actualDir += da[ i ] + '/';
      }
    }

    this._loadDir();

  }

  createDir(): void {


    const dir = this.actualDir + this.newDir;

    // console.info('create dir', dir);

    this.backendService.createDir( dir ).then( res => {

      // console.info('dir', res);
      this.newDir = '';
      this._loadDir();

    });

  }

  deleteDir(item): void {


    const dir = this.actualDir + item.filename;

    // console.info('delete dir', dir);

    this.backendService.deleteDir( dir ).then( res => {

      // console.info('dir', res);
      // this.newDir = '';
      this._loadDir();

    });

  }


  setselectedfiles(): void {

    this.selectedfiles = [];
    for (const i in this.xfiles) {
      if (this.xfiles.hasOwnProperty(i)) {

        if ( this.xfiles[i].selected ) {

          this.selectedfiles.push( this.xfiles[i] );

        }
      }
    }


  }

  deleteFile( item ): void {

      const afiles = [ item.filename ];
      const adir = this.actualDir;
      this.backendService.deleteFiles( afiles, adir ).then( res => {

        this._loadDir();

      });

  }

  createThumbnail( item ): void {

    const tfile = this.actualDir + item.filename;

    console.info('create thumb', tfile);

    this.backendService.createThumbnail( tfile ).then( res => {

      // console.info('dir', res);
      // this.newDir = '';
      this._loadDir();

    });

  }




  private _loadDir(): void {

    this.loading = true;
    this.clickedFile = '';
    this.clickedImgFile = '';
    this.backendService.loadDataByID(this.actualDir, 'loadFolder').then( res => {

      // console.info('files', res);
      this.xfiles = res.files.sort(this._compare);
      this.xdirs = res.dirs.sort(this._compare);
      this.selectedfiles = [];

      for (const i in this.xfiles) {
        if (this.xfiles.hasOwnProperty(i)) {
          this.xfiles[i].iconCss = this._setIcon(this.xfiles[i].filename);
          this.xfiles[i].selected = false;
        }
      }

      this.loading = false;
      // console.info('xfiles', this.xfiles);

    });


  }

  private _compare(a, b) {
    if (a.filename < b.filename) {
      return -1;
    }

    if (a.filename > b.filename) {
      return 1;
    }
    return 0;
  }


  private _setIcon( filename: string ): string {

    const images = ['jpg', 'png', 'bmp', 'jpeg', 'gif', 'svg'];

    let icon = 'file-o';
    const z = filename.split('.');
    const ext = z[z.length - 1].toLowerCase();

    if ( images.includes(ext) ) {

      icon = 'file-image-o';

    }

    // console.log(ext);

    return icon;

  }








}








