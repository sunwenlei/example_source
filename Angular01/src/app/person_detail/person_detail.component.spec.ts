/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Person_detailComponent } from './person_detail.component';

describe('Person_detailComponent', () => {
  let component: Person_detailComponent;
  let fixture: ComponentFixture<Person_detailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Person_detailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Person_detailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
