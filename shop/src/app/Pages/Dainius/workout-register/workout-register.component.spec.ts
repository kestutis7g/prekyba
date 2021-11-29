import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutRegisterComponent } from './workout-register.component';

describe('WorkoutRegisterComponent', () => {
  let component: WorkoutRegisterComponent;
  let fixture: ComponentFixture<WorkoutRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
