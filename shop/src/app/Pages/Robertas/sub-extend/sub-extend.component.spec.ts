import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubExtendComponent } from './sub-extend.component';

describe('SubExtendComponent', () => {
  let component: SubExtendComponent;
  let fixture: ComponentFixture<SubExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubExtendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
