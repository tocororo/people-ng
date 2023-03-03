import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPeopleComponent } from './import-people.component';

describe('ImportPeopleComponent', () => {
  let component: ImportPeopleComponent;
  let fixture: ComponentFixture<ImportPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
