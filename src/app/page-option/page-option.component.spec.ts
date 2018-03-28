import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOptionComponent } from './page-option.component';

describe('PageOptionComponent', () => {
  let component: PageOptionComponent;
  let fixture: ComponentFixture<PageOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
