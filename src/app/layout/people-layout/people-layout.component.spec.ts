import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleLayoutComponent } from './people-layout.component';

describe('PeopleLayoutComponent', () => {
  let component: PeopleLayoutComponent;
  let fixture: ComponentFixture<PeopleLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
