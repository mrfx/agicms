import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';


export  interface IcategoryPages {
  id: string;
  parentID: string;
  name: string;
  rank: string;
  subpages: any[];
}


@Component({
  selector: 'app-item-sortable',
  templateUrl: './item-sortable.component.html',
  styleUrls: ['./item-sortable.component.scss']
})
export class ItemSortableComponent implements OnInit, OnChanges {

  @Input() sOption: any[] = [];

  public sortableObject: any;
  public subpages: any[] = [];

  ngOnChanges(changes: SimpleChanges) {

    // this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

    this.sortableObject = this.sOption;
    // this.subpages = this.sortableObject.subpages;

  }


  constructor() { }

  ngOnInit() {

    this.sortableObject = this.sOption;
    // this.subpages = this.sortableObject.subpages;
    for ( const ss in this.sortableObject.subpages ) {
      if ( this.sortableObject.subpages.hasOwnProperty( ss ) ) {
        // console.info('ssa',ss);
        this.subpages.push(this.sortableObject.subpages[ss]);
      }
    }
    // console.info('sso', this.sortableObject);

  }

  changeOrderCategory(): void {

    const ss = this.subpages;

    for (const i in ss) {

      if ( ss.hasOwnProperty( i ) ) {

        this.subpages[i].rank = i;
        this.subpages[i].rank++;

      }

    }

  }


  categoryClick( item ): void {

    // this.selectedCategory = item.initData;

  }



  checkSubpages ( item ): any {

    return typeof ( item );

  }



}
