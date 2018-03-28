import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCategoriesComponent } from './conf-categories.component';

describe('ConfCategoriesComponent', () => {
  let component: ConfCategoriesComponent;
  let fixture: ComponentFixture<ConfCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
