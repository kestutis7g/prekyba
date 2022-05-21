import { TestBed } from '@angular/core/testing';

import { ItemBalanceService } from './itemBalance.service';

describe('ItemBalanceService', () => {
  let service: ItemBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
