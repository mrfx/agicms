import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCkeditorComponent } from './page-ckeditor.component';

describe('PageCkeditorComponent', () => {
  let component: PageCkeditorComponent;
  let fixture: ComponentFixture<PageCkeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCkeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCkeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
