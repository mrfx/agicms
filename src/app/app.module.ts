import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { AlertModule, ModalModule, PopoverModule, TooltipModule } from 'ngx-bootstrap';

import { FileUploadModule } from 'ng2-file-upload';

import { CKEditorModule } from 'ng2-ckeditor';
import { NgxDnDModule} from '@swimlane/ngx-dnd';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import {HttpClientModule} from '@angular/common/http';

import { Angular2FontawesomeModule } from 'angular2-fontawesome';


import { StructureMenuComponent } from './structure-menu/structure-menu.component';
import { PagesListComponent } from './pages-list/pages-list.component';
import { FilesListComponent } from './files-list/files-list.component';
import { GalleriesListComponent } from './galleries-list/galleries-list.component';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { BackendService } from './backend.service';
import { CategoryPagesComponent } from './category-pages/category-pages.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfPageOptionsSiteTypesComponent } from './conf-page-options-site-types/conf-page-options-site-types.component';
import { PageOptionComponent } from './page-option/page-option.component';
import { ConfCategoriesComponent } from './conf-categories/conf-categories.component';
import { ItemSortableComponent } from './item-sortable/item-sortable.component';
import { TreeModule } from 'ng2-tree';
import { ConfCategoryEditComponent } from './conf-category-edit/conf-category-edit.component';
import { PageCkeditorComponent } from './page-ckeditor/page-ckeditor.component';
import { FilesUploadComponent } from './files-upload/files-upload.component';
import { GalleryEditComponent } from './gallery-edit/gallery-edit.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    StructureMenuComponent,
    PagesListComponent,
    FilesListComponent,
    GalleriesListComponent,
    MenuTopComponent,
    CategoryPagesComponent,
    LoginComponent,
    PageEditComponent,
    ConfigurationComponent,
    ConfPageOptionsSiteTypesComponent,
    PageOptionComponent,
    ConfCategoriesComponent,
    ItemSortableComponent,
    ConfCategoryEditComponent,
    PageCkeditorComponent,
    FilesUploadComponent,
    GalleryEditComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    SortableModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    FileUploadModule,
    AppRoutingModule,
    HttpClientModule,
    CKEditorModule,
    TreeModule,
    NgxDnDModule,
    Angular2FontawesomeModule
  ],
  providers: [ BackendService, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
