import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {

  private url  = '/srv-upload/';
  public uploader: FileUploader = new FileUploader({url: this.url });
  public hasBaseDropZoneOver = false;

  public targetDir: any;

  public generateThumbnail = true;
  public resizeImage = true;
  private _actualDir = '/';


  @Input()
  set actualDir( dir: string ) {

    this._actualDir = dir;
    this._updateOptions();


  }
  get actualDir(): string {

      return this._actualDir;

  }

  @Output() uploaded = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

    this.targetDir = this.actualDir;
    this._updateOptions();

    this.uploader.onCompleteAll = () => {

      // console.info('uploaded');
      this.uploaded.emit('ok');

    };


  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  private _updateOptions(): void {

    this.targetDir = this._actualDir;
    this.uploader.options.removeAfterUpload = true;
    this.uploader.options.additionalParameter = {
      'dir': this.targetDir,
      'thumbnail': this.generateThumbnail.toString(),
      'resizeImage': this.resizeImage.toString()
    };

  }

  resizeClick(): void {

    // console.info('resize', this.resizeImage);
    this._updateOptions();

  }


  thumbnailClick(): void {

    this._updateOptions();
  }



}
