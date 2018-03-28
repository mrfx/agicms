import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PagesListComponent} from './pages-list/pages-list.component';
import { StructureMenuComponent} from './structure-menu/structure-menu.component';
import { GalleriesListComponent } from './galleries-list/galleries-list.component';
import { FilesListComponent } from './files-list/files-list.component';
import { CategoryPagesComponent } from './category-pages/category-pages.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfPageOptionsSiteTypesComponent } from './conf-page-options-site-types/conf-page-options-site-types.component';
import { ConfCategoriesComponent } from './conf-categories/conf-categories.component';
import { PageCkeditorComponent } from './page-ckeditor/page-ckeditor.component';
import {  GalleryEditComponent } from './gallery-edit/gallery-edit.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/categories/0', pathMatch: 'full' },
  { path: 'categories/:id', component: CategoryPagesComponent },
  { path: 'pages/:id', component: PagesListComponent },
  { path: 'structure/:id', component: StructureMenuComponent },
  { path: 'files', component: FilesListComponent },
  { path: 'galleries', component: GalleriesListComponent },
  { path: 'gallery-edit/:id', component: GalleryEditComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'conf-page-options-site-types', component: ConfPageOptionsSiteTypesComponent },
  { path: 'page-edit/:id', component: PageEditComponent,  },
  { path: 'page-ckeditor/:id', component: PageCkeditorComponent },
  { path: 'conf-categories', component: ConfCategoriesComponent },
  { path: 'about', component: AboutComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
