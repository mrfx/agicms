import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfPageOptionsSiteTypesComponent } from './conf-page-options-site-types.component';

describe('ConfPageOptionsSiteTypesComponent', () => {
  let component: ConfPageOptionsSiteTypesComponent;
  let fixture: ComponentFixture<ConfPageOptionsSiteTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfPageOptionsSiteTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfPageOptionsSiteTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
