import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { BackendService } from '../backend.service';
import { ItemSortableComponent } from '../item-sortable/item-sortable.component';


export  interface IcategoryPages {
  id: string;
  parentID: string;
  name: string;
  rank: string;
  subpages: any[];
}



@Component({
  selector: 'app-category-pages',
  templateUrl: './category-pages.component.html',
  styleUrls: ['./category-pages.component.scss']
})




export class CategoryPagesComponent implements OnInit {


  public categories: Array<any> = [];
  public id: number;
  public selectedCategory: IcategoryPages  = {
    id: '0',
    parentID: '0',
    name: '-',
    rank: '0',
    subpages: []
  };

  constructor( private backendService: BackendService,
               private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.id = +this.route.snapshot.paramMap.get('id');
    this.backendService.loadCategories(this.id).then( z => {

      this.categories = z;
      this.selectedCategory = this.categories[0];
      // console.info('zz', z);

    });

  }

  changeOrderCategory(): void {

    for (const i in this.categories) {

      if ( this.categories.hasOwnProperty( i ) ) {

        this.categories[i].rank = i;
        this.categories[i].rank++;

      }

    }

  }


  categoryClick( item ): void {

    this.selectedCategory = item.initData;

  }


  checkSubpages ( item ): any {

    return typeof ( item );

  }




}





