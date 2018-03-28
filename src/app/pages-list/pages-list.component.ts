import {Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BackendService } from '../backend.service';
import { Pages } from '../pages';


@Component({
  selector: 'app-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.scss']
})
export class PagesListComponent implements OnInit, OnChanges {

  public pages: Array<any> = [];
  public filteredPages: Array<any> = [];
  public searchPages = '';
  public id: number;
  public newPageNameCms = '';

  @Input() pageCategory: any;

  ngOnChanges(changes: SimpleChanges) {

    // this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

    this.id = +this.pageCategory.id;
    // console.info('id2', this.id);
    if ( this.id !== 0 ) {

      this.loadPages();

    }

  }

  constructor( private backendService: BackendService,
               private route: ActivatedRoute,
               private router: Router
  ) { }

  ngOnInit() {

    this.id = +this.route.snapshot.paramMap.get('id');
    // console.info('id', this.id);
    if ( this.id !== 0 ) {

      this.loadPages();


    }

  }


  private loadPages () {

    this.backendService.loadPages(this.id).then( z => {


      // console.info('z', z);
      if (z === false) {

        this.pages = [];
        this.filteredPages = [];

      } else {

        this.pages = z;
        this.filteredPages = z;


      }

      this.newPageNameCms = '';


    });

  }



  filterPages(): void {

    this.filteredPages = this.pages.filter(
      (item: Pages) => {

        const a = item.title.toUpperCase();
        const b = item.titleCMS.toUpperCase();
        const c = item.id;
        const x = this.searchPages.toUpperCase();
        return (a.indexOf( x ) !== -1 || b.indexOf( x ) !== -1 || c.indexOf( x ) !== -1  );

      }

    );

  }



  pageClick(id): void {

    // console.info ('click', id);
    this.router.navigateByUrl('/page-edit/' + id );

  }


  pageAdd(): void {

    const fields = [ 'titleCMS', 'categoryID', 'rank' ];
    const values = [ this.newPageNameCms, (this.id).toString(), (this.pages.length + 1).toString() ];
    this.backendService.addRow('pages', fields, values, true ).then( res => {

      this.loadPages();

    });

  }

  pageDelete( id ): void {

    this.backendService.loadDataByID( id, 'deletePage' ).then( res => {

      if ( res.info === 'cannot') {

        console.info('cannot delete', res);

      } else {

        console.info('ok', res);
        this.loadPages();

      }

    });

  }









}










