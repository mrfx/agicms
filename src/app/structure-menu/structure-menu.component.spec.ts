import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureMenuComponent } from './structure-menu.component';

describe('StructureMenuComponent', () => {
  let component: StructureMenuComponent;
  let fixture: ComponentFixture<StructureMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
