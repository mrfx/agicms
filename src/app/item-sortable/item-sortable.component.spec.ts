import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSortableComponent } from './item-sortable.component';

describe('ItemSortableComponent', () => {
  let component: ItemSortableComponent;
  let fixture: ComponentFixture<ItemSortableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSortableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSortableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
