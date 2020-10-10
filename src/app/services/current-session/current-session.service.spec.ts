import { TestBed } from '@angular/core/testing';

import { CurrentSessionService } from './current-session.service';

describe('CurrentSessionService', () => {
  let service: CurrentSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
