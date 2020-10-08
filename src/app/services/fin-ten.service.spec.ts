import { TestBed } from '@angular/core/testing';

import { FinTenService } from './fin-ten.service';

describe('FinTenService', () => {
  let service: FinTenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinTenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
