import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCategoryEditComponent } from './conf-category-edit.component';

describe('ConfCategoryEditComponent', () => {
  let component: ConfCategoryEditComponent;
  let fixture: ComponentFixture<ConfCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
