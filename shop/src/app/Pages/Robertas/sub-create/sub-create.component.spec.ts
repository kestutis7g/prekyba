import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCreateComponent } from './sub-create.component';

describe('SubCreateComponent', () => {
  let component: SubCreateComponent;
  let fixture: ComponentFixture<SubCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
