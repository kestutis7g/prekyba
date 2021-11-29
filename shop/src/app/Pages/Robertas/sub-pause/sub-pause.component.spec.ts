import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPauseComponent } from './sub-pause.component';

describe('SubPauseComponent', () => {
  let component: SubPauseComponent;
  let fixture: ComponentFixture<SubPauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubPauseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
