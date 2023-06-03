import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlQueryViewComponent } from './sparql-query-view.component';

describe('SparqlQueryViewComponent', () => {
  let component: SparqlQueryViewComponent;
  let fixture: ComponentFixture<SparqlQueryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparqlQueryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparqlQueryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
