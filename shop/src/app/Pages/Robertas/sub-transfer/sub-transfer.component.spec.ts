import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTransferComponent } from './sub-transfer.component';

describe('SubTransferComponent', () => {
  let component: SubTransferComponent;
  let fixture: ComponentFixture<SubTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
