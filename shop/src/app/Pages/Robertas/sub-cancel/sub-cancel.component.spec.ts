import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCancelComponent } from './sub-cancel.component';

describe('SubCancelComponent', () => {
  let component: SubCancelComponent;
  let fixture: ComponentFixture<SubCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
