import { TestBed } from '@angular/core/testing';

import { AccesslevelGuard } from './accesslevel.guard';

describe('AccesslevelGuard', () => {
  let guard: AccesslevelGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesslevelGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
